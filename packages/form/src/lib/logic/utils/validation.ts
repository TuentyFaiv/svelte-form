import { SchemaError, SchemaErrorList } from "./errors.js";
import { Adapter } from "../typing/stores/form.js";

// eslint-disable-next-line import/order
import type { Writable } from "svelte/store";
import type {
  Schema,
  ArraySchema,
  FieldPropSchema,
  FieldsSchema,
  DeepSchema,
} from "../typing/stores/form.js";
import type {
  Infer,
  InvalidErrorConfig,
  Parsed,
  ParsedArray,
  ParsedPrimitive,
  RangeErrordConfig,
  RequiredErrorConfig,
  TypeErrorConfig,
} from "../typing/utils/validation.js";
import type { Errors } from "../typing/utils/errors.js";

const fieldsSchema = {
  string: "",
  number: 0,
  boolean: false,
  date: new Date(),
  file: null,
};

const primitives = ["string", "number", "boolean", "date", "file"];

export function bridge<T extends FieldsSchema = FieldsSchema, Data = Infer<T>>(schema: T): Adapter<Data> {
  function resolveSchema(field: Schema, required = false): ParsedPrimitive {
    if (required) {
      return fieldsSchema[field instanceof RegExp ? "string" : field];
    }

    return null;
  }

  function isFieldProps(three: DeepSchema): boolean {
    const hasFieldProps = (Object.hasOwn(three, "required") && typeof three.required === "boolean")
    || (Object.hasOwn(three, "min") && typeof three.min === "number")
    || (Object.hasOwn(three, "max") && typeof three.max === "number");
    return Object.hasOwn(three, "type")
      && ((typeof three.type === "string" && three.type !== "array") || three.type instanceof RegExp)
      && (primitives.includes(three.type instanceof RegExp ? "string" : three.type)
      || hasFieldProps);
  }

  function isArraySchema(three: DeepSchema): boolean {
    return Object.hasOwn(three, "type") && three.type === "array" && Object.hasOwn(three, "item");
  }

  function resolveFieldProps({ type, required }: FieldPropSchema<Schema>): ParsedPrimitive {
    return resolveSchema(type, required);
  }

  function resolveArray({ item, required }: ArraySchema): ParsedArray {
    if (typeof item === "string" || item instanceof RegExp) {
      return required ? [] : null;
    }
    if (typeof item === "object" && !(item instanceof RegExp) && isArraySchema(item)) {
      return required ? [resolveArray(item as ArraySchema)] : null;
    }
    if (typeof item === "object" && !(item instanceof RegExp) && isFieldProps(item)) {
      return required ? [] : null;
    }

    return required ? [] : null;
  }

  function resolveDeep(three: Schema | DeepSchema): Parsed | ParsedPrimitive | ParsedArray {
    if (typeof three === "string" || three instanceof RegExp) {
      return resolveSchema(three);
    }

    if (isFieldProps(three)) {
      return resolveFieldProps(three as FieldPropSchema<Schema>);
    }

    if (isArraySchema(three)) {
      return resolveArray(three as ArraySchema);
    }

    const resolveSelf = Object.keys(three).reduce((acc, key) => ({
      ...acc,
      [key]: resolveDeep((three as FieldsSchema)[key]),
    }), {});

    return resolveSelf;
  }

  function typeError({ type, ...config }: TypeErrorConfig): SchemaError {
    return new SchemaError({
      ...config,
      message: `The value is not a ${type}.`,
      reason: `The type is a ${type}, but the value is ${config.value}.`,
    });
  }

  function invalidError(config: InvalidErrorConfig): SchemaError {
    return new SchemaError({
      ...config,
      message: "The type is invalid.",
      reason: "The type is invalid, check the schema.",
    });
  }

  function requiredError(config: RequiredErrorConfig): SchemaError {
    return new SchemaError({
      ...config,
      message: "The field is required.",
      reason: "The field is required, but the value is empty.",
    });
  }

  function rangeError({ label, range, ...config }: RangeErrordConfig): SchemaError {
    const compare = label === "min" ? "less" : "more";
    let legend = typeof config.value === "string" ? " characters" : "";
    let rangeLegend = range as number | Date | string;

    if (config.value instanceof Date) {
      legend = " date";
    }

    if (config.value instanceof File || config.value instanceof Blob) {
      legend = " bytes";
    }

    if (range instanceof Date) {
      rangeLegend = ` ${range.toISOString()}`;
    }

    return new SchemaError({
      ...config,
      message: `The value is ${compare} than ${rangeLegend}${legend}.`,
      reason: `The value is ${compare} than ${rangeLegend}${legend}. Check the ${label} property in the schema.`,
    });
  }

  class InternalAdapter extends Adapter<Data> {
    #schema: T;

    constructor() {
      super();
      this.#schema = schema;

      Object.freeze(this);
    }

    // eslint-disable-next-line class-methods-use-this
    #validateSchema = (fieldSchema: Schema, field: keyof Data, value: unknown): ParsedPrimitive | SchemaError => {
      const correctSchema = fieldSchema instanceof RegExp
        || fieldSchema === "string"
        || fieldSchema === "number"
        || fieldSchema === "boolean"
        || fieldSchema === "date"
        || fieldSchema === "file";

      const error = { field: String(field), schema: fieldSchema, value };

      if (correctSchema) {
        if (typeof value === "string") {
          if (fieldSchema instanceof RegExp) {
            if (fieldSchema.test(value)) return value;

            return new SchemaError({
              ...error,
              schema: fieldSchema.source as "string",
              message: "The value is not match with the pattern.",
              reason: `Value: "${value}" is not match with the pattern: ${fieldSchema.source}`,
            });
          }

          return value;
        }

        const correct = value === null
          || typeof value === "undefined"
          || typeof value === "string"
          || typeof value === "number"
          || typeof value === "boolean"
          || value instanceof Date
          || value instanceof File
          || value instanceof Blob;

        if (correct) return value;

        const dateType = fieldSchema === "date" ? "Date" : fieldSchema;
        const fileType = dateType === "file" ? "File | Blob" : dateType;
        const errorType = fileType instanceof RegExp ? "RegExp" : fileType;

        return typeError({ ...error, type: errorType });
      }

      return invalidError(error);
    };

    #validateFieldPropsSchema = (
      fieldSchema: FieldPropSchema<Schema>,
      field: keyof Data,
      value: unknown,
    ): ParsedPrimitive | SchemaError => {
      const { type, required, min, max } = fieldSchema;

      const validated = this.#validateSchema(type, field, value);
      const isEmpty = typeof validated === "undefined" || validated === null;
      const correctSchema = type instanceof RegExp
        || type === "string"
        || type === "number"
        || type === "boolean"
        || type === "date"
        || type === "file";

      const invalid = { field: String(field), schema: fieldSchema, value };

      if (correctSchema) {
        const error = { ...invalid, value: validated };
        const errorMin = { ...error, label: "min", range: min, value: validated } as const;
        const errorMax = { ...error, label: "max", range: max, value: validated } as const;

        if (required && ((typeof validated === "string" && validated.length === 0) || isEmpty)) {
          return requiredError(error);
        }

        if (typeof validated === "string") {
          if (min && validated.length < min) {
            return rangeError(errorMin);
          }

          if (max && validated.length > max) {
            return rangeError(errorMax);
          }
        }

        if (typeof validated === "number") {
          if (min && validated < min) {
            return rangeError(errorMin);
          }

          if (max && validated > max) {
            return rangeError(errorMax);
          }
        }

        if (validated instanceof Date) {
          if (min && validated.getTime() < min) {
            return rangeError({ ...errorMin, range: new Date(min) });
          }

          if (max && validated.getTime() > max) {
            return rangeError({ ...errorMax, range: new Date(max) });
          }
        }

        if ((validated instanceof File || validated instanceof Blob)) {
          if (min && validated.size < min) {
            return rangeError(errorMin);
          }

          if (max && validated.size > max) {
            return rangeError(errorMax);
          }
        }

        return validated;
      }

      return invalidError(invalid);
    };

    #validateArraySchema = (
      fieldSchema: ArraySchema,
      field: keyof Data,
      value: unknown,
    ): ParsedArray | null | undefined | SchemaError => {
      const { item, required, min, max } = fieldSchema;

      const isEmpty = typeof value === "undefined" || value === null || (Array.isArray(value) && value.length === 0);

      const error = { field: String(field), schema: fieldSchema, value };

      if (!Array.isArray(value) && typeof value !== "undefined" && value !== null) {
        return invalidError(error);
      }

      if (required && isEmpty) {
        return requiredError(error);
      }

      if (value && min && value.length < min) {
        return rangeError({ ...error, label: "min", range: min, value });
      }

      if (value && max && value.length > max) {
        return rangeError({ ...error, label: "max", range: max, value });
      }

      if ((typeof item === "string" || item instanceof RegExp)) {
        const incorrect = value?.find((itemValue) => {
          const validated = this.#validateSchema(item, field, itemValue);
          return validated instanceof SchemaError;
        });

        if (incorrect) {
          const isRegExp = item instanceof RegExp ? "string" : item;
          const isFile = isRegExp === "file" ? "File | Blob" : isRegExp;
          const isDate = isFile === "date" ? "Date" : isFile;

          return typeError({ ...error, type: `${isDate}[]`, value: incorrect });
        }

        return value;
      }

      if (typeof item === "object" && !(item instanceof RegExp) && isArraySchema(item)) {
        const incorrect = value?.find((subArray) => {
          const validated = this.#validateArraySchema(item as ArraySchema, field, subArray);
          return validated instanceof SchemaError;
        });

        if (incorrect) {
          return typeError({ ...error, type: "array", value: incorrect });
        }

        return value;
      }

      if (typeof item === "object" && !(item instanceof RegExp) && isFieldProps(item)) {
        const incorrect = value?.find((itemValue) => {
          const validated = this.#validateFieldPropsSchema(item as FieldPropSchema<Schema>, field, itemValue);
          return validated instanceof SchemaError;
        });

        if (incorrect) {
          return typeError({ ...error, type: "array", value: incorrect });
        }

        return value;
      }

      if (typeof item === "object" && !(item instanceof RegExp)) {
        const incorrect = value?.find((itemValue) => {
          const validated = this.#validateDeepSchema(item as FieldsSchema, field, itemValue);
          return validated instanceof SchemaError;
        });

        if (incorrect) {
          return typeError({ ...error, type: "array", value: incorrect });
        }

        return value;
      }

      return invalidError(error);
    };

    #validateDeepSchema = (
      fieldSchema: Schema | DeepSchema,
      field: keyof Data,
      value: unknown,
    ): Parsed | ParsedPrimitive | ParsedArray | SchemaError | SchemaErrorList => {
      if (typeof fieldSchema === "string" || fieldSchema instanceof RegExp) {
        return this.#validateSchema(fieldSchema, field, value);
      }

      if (isArraySchema(fieldSchema)) {
        return this.#validateArraySchema(fieldSchema as ArraySchema, field, value);
      }

      if (isFieldProps(fieldSchema)) {
        return this.#validateFieldPropsSchema(fieldSchema as FieldPropSchema<Schema>, field, value);
      }

      const validateSelf = Object.keys(fieldSchema).reduce((acc, key) => ({
        ...acc,
        [key]: this.#validateDeepSchema(
          (fieldSchema as FieldsSchema)[key],
          key as keyof Data,
          (value as Parsed)[key],
        ),
      }), {});

      if (Object.values(validateSelf).some((item) => (item instanceof SchemaError || item instanceof SchemaErrorList))) {
        const errors = Object.values(validateSelf)
          .filter((item) => (item instanceof SchemaError || item instanceof SchemaErrorList))
          .flatMap((item) => (item instanceof SchemaErrorList ? item.errors : item as SchemaError[]));

        return new SchemaErrorList(errors);
      }

      return validateSelf;
    };

    // eslint-disable-next-line class-methods-use-this
    #setError = async (field: keyof Data, errors: Writable<Errors<Data>>, error?: unknown) => {
      let message: string | null = null;
      if (error instanceof SchemaError) {
        message = error.reason;
      }

      if (error instanceof SchemaErrorList) {
        message = error.errors.reduce((acc, current) => (
          `${acc}${current.reason}. `
        ), "");
      }

      await errors.update((prev) => ({ ...prev, [field]: message }));
    };

    initial = () => {
      const start = Object.keys(this.#schema).reduce((acc, key) => ({
        fields: {
          ...acc.fields,
          [key]: resolveDeep(this.#schema[key]),
        },
        errors: {
          ...acc.errors,
          [key]: null,
        },
      }), {
        fields: {} as Data,
        errors: {} as Errors<Data>,
      });

      return start;
    };

    validate = async <D = Data>(data: D): Promise<void> => {
      if (typeof data === "object" && !Array.isArray(data) && data !== null) {
        const guard = Object.keys(data).map((key) => (
          this.#validateDeepSchema(this.#schema[key], key as keyof Data, data[key as keyof D])
        ));

        if (guard.some((item) => item instanceof SchemaError || item instanceof SchemaErrorList)) {
          const errors = guard
            .filter((item) => item instanceof SchemaError || item instanceof SchemaErrorList)
            .flatMap((item) => (item instanceof SchemaErrorList ? item.errors : item as SchemaError));

          throw new SchemaErrorList(errors);
        }
      }
    };

    field = async (field: keyof Data, value: Data[keyof Data], errors: Writable<Errors<Data>>): Promise<void> => {
      try {
        const guard = await this.#validateDeepSchema(this.#schema[field as string], field, value);

        if (guard instanceof SchemaError || guard instanceof SchemaErrorList) throw guard;

        await this.#setError(field, errors);
      } catch (error) {
        await this.#setError(field, errors, error);
      }
    };

    // eslint-disable-next-line class-methods-use-this
    errors = async (
      error: unknown,
      errors: Writable<Errors<Data>>,
      handle?: (error: unknown) => (void | Promise<void>),
    ): Promise<void> => {
      await handle?.(error);

      if (error instanceof SchemaErrorList) {
        const newErrors = error.errors.reduce((acc, err) => ({
          ...acc,
          [err.field]: err.reason,
        }), {} as Errors<Data>);

        await errors.update((prev) => ({ ...prev, ...newErrors }));
      }
    };
  }

  return new InternalAdapter();
}
