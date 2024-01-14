/* eslint-disable class-methods-use-this */
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
};

const primitives = ["string", "number", "boolean", "date"];

export function bridge<T extends FieldsSchema = FieldsSchema, Data = Infer<T>>(schema: T): Adapter<Data> {
  function resolveSchema(field: Schema): ParsedPrimitive {
    const key = field instanceof RegExp ? "string" : field;
    return fieldsSchema[key];
  }

  function isFieldProps(three: DeepSchema): boolean {
    const hasFieldProps = (Object.hasOwn(three, "required") && typeof three.required === "number")
    || (Object.hasOwn(three, "min") && typeof three.min === "number")
    || (Object.hasOwn(three, "max") && typeof three.max === "number");
    return Object.hasOwn(three, "type")
      && ((typeof three.type === "string" && three.type !== "array") || three.type instanceof RegExp)
      && (primitives.includes(three.type instanceof RegExp ? "string" : three.type)
      || hasFieldProps);
  }

  function resolveFieldProps(three: DeepSchema): ParsedPrimitive {
    if (isFieldProps(three)) {
      const fieldProps = three as FieldPropSchema<Schema>;
      return resolveSchema(fieldProps.type);
    }

    return undefined;
  }

  function isArraySchema(three: DeepSchema): boolean {
    return Object.hasOwn(three, "type") && three.type === "array" && Object.hasOwn(three, "item");
  }

  function resolveArray(three: DeepSchema): ParsedArray {
    if (isArraySchema(three)) {
      const { item } = three as ArraySchema;
      if (typeof item === "string" || item instanceof RegExp) {
        return [];
      }
      if (typeof item === "object" && !(item instanceof RegExp) && isArraySchema(item)) {
        return [resolveArray(item)];
      }
      if (typeof item === "object" && !(item instanceof RegExp) && isFieldProps(item)) {
        return [];
      }
    }
    if (isFieldProps(three)) {
      return [];
    }
    return [];
  }

  function resolveDeep(three: Schema | DeepSchema): Parsed | ParsedPrimitive | ParsedArray {
    if (typeof three === "string" || three instanceof RegExp) {
      return resolveSchema(three);
    }

    if (isFieldProps(three)) {
      return resolveFieldProps(three);
    }
    if (isArraySchema(three)) {
      return resolveArray(three);
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

    const characters = typeof config.value === "string" ? " characters" : "";
    const legend = config.value instanceof Date ? ` ${config.value.toISOString()}` : characters;
    const rangeLegend = range instanceof Date ? ` ${range.toISOString()}` : range;

    return new SchemaError({
      ...config,
      message: `The value is ${compare} than ${rangeLegend}${legend}.`,
      reason: `The value is ${compare} than ${rangeLegend}${legend}. Check the ${label} property in the schema.`,
    });
  }

  function validateSchema(fieldSchema: Schema, field: keyof Data, value: unknown): ParsedPrimitive | SchemaError {
    const realType = fieldSchema !== "date" ? fieldSchema : new Date();

    const errorConfig = {
      field: String(field),
      schema: fieldSchema,
      value,
    };

    if (realType instanceof RegExp) {
      if (typeof value === "string") {
        if (realType.test(value)) {
          return value;
        }

        return new SchemaError({
          ...errorConfig,
          schema: realType.source as "string",
          message: "The value is not match with the pattern.",
          reason: `Value: "${value}" is not match with the pattern: ${realType.source}`,
        });
      }

      return typeError({ ...errorConfig, type: "RegExp" });
    }

    if (realType === "string") {
      if (typeof value === "string") {
        return value;
      }

      return typeError({ ...errorConfig, type: "string" });
    }

    if (realType instanceof Date) {
      if (value instanceof Date) {
        return value;
      }

      return typeError({ ...errorConfig, type: "Date" });
    }

    if (realType === "number") {
      if (typeof value === "number") {
        return value;
      }

      return typeError({ ...errorConfig, type: "number" });
    }

    if (realType === "boolean") {
      if (typeof value === "boolean") {
        return value;
      }

      return typeError({ ...errorConfig, type: "boolean" });
    }

    if (typeof value === "undefined" || value === null) {
      return value;
    }

    return invalidError(errorConfig);
  }

  function validateFieldPropsSchema(fieldSchema: DeepSchema, field: keyof Data, value: unknown): ParsedPrimitive | SchemaError {
    const invalidConfig = {
      field: String(field),
      schema: fieldSchema,
      value,
    };

    if (isFieldProps(fieldSchema)) {
      const { type, required, min, max } = fieldSchema as FieldPropSchema<Schema>;
      const validated = validateSchema(type, field, value);
      const isEmpty = typeof validated === "undefined" || validated === null;

      const errorConfig = {
        ...invalidConfig,
        value: validated,
      };

      if (type === "boolean") {
        if (required && isEmpty) return requiredError(errorConfig);

        return validated;
      }

      if ((type instanceof RegExp || type === "string")) {
        if (required && ((typeof validated === "string" && validated.length === 0) || isEmpty)) {
          return requiredError(errorConfig);
        }

        if (typeof validated === "string" && min && validated.length < min) {
          return rangeError({ ...errorConfig, label: "min", range: min, value: validated });
        }

        if (typeof validated === "string" && max && validated.length > max) {
          return rangeError({ ...errorConfig, label: "max", range: max, value: validated });
        }

        return validated;
      }

      if (type === "number") {
        if (required && isEmpty) return requiredError(errorConfig);

        if (typeof validated === "number" && min && validated < min) {
          return rangeError({ ...errorConfig, label: "min", range: min, value: validated });
        }

        if (typeof validated === "number" && max && validated > max) {
          return rangeError({ ...errorConfig, label: "max", range: max, value: validated });
        }

        return validated;
      }

      if (type === "date") {
        if (required && isEmpty) return requiredError(errorConfig);

        if (validated instanceof Date && min && validated.getTime() < min) {
          return rangeError({ ...errorConfig, label: "min", range: new Date(min), value: validated });
        }

        if (validated instanceof Date && max && validated.getTime() > max) {
          return rangeError({ ...errorConfig, label: "max", range: new Date(max), value: validated });
        }

        return validated;
      }
    }

    return invalidError(invalidConfig);
  }

  function validateArraySchema(fieldSchema: DeepSchema, field: keyof Data, value: unknown): ParsedArray | SchemaError {
    const errorConfig = {
      field: String(field),
      schema: fieldSchema,
      value,
    };

    if (isArraySchema(fieldSchema)) {
      const { item, required } = fieldSchema as ArraySchema;

      if (typeof item === "string" || item instanceof RegExp) {
        if (Array.isArray(value) && value.every((itemValue) => validateSchema(item, field, itemValue))) {
          return value;
        }

        const isRegExp = item instanceof RegExp ? "string" : item;
        const isDate = isRegExp === "date" ? "Date" : isRegExp;

        return typeError({ ...errorConfig, type: `${isDate}[]` });
      }

      if (typeof item === "object" && !(item instanceof RegExp) && isArraySchema(item)) {
        if (Array.isArray(value) && value.every((itemValue) => validateArraySchema(item, field, itemValue))) {
          return value;
        }

        return typeError({ ...errorConfig, type: "array" });
      }

      if (typeof item === "object" && !(item instanceof RegExp) && isFieldProps(item)) {
        if (Array.isArray(value) && value.every((itemValue) => validateFieldPropsSchema(item, field, itemValue))) {
          return value;
        }

        return typeError({ ...errorConfig, type: "array" });
      }
    }

    if (isFieldProps(fieldSchema)) {
      if (Array.isArray(value) && value.every((itemValue) => validateFieldPropsSchema(fieldSchema, field, itemValue))) {
        return value;
      }

      return typeError({ ...errorConfig, type: "array" });
    }

    return invalidError(errorConfig);
  }

  function validateDeepSchema(
    fieldSchema: Schema | DeepSchema,
    field: keyof Data,
    value: unknown,
  ): Parsed | ParsedPrimitive | ParsedArray | SchemaError {
    if (typeof fieldSchema === "string" || fieldSchema instanceof RegExp) {
      return validateSchema(fieldSchema, field, value);
    }

    if (isFieldProps(fieldSchema)) {
      return validateFieldPropsSchema(fieldSchema, field, value);
    }

    if (isArraySchema(fieldSchema)) {
      return validateArraySchema(fieldSchema, field, value);
    }

    const validateSelf = Object.keys(fieldSchema).reduce((acc, key) => ({
      ...acc,
      [key]: validateDeepSchema(
        (fieldSchema as FieldsSchema)[key],
        key as keyof Data,
        (value as Parsed)[key],
      ),
    }), {});

    return validateSelf;
  }

  class InternalAdapter extends Adapter<Data> {
    #setError = async (field: keyof Data, errors: Writable<Errors<Data>>, error?: unknown) => {
      let message: string | null = null;
      if (error instanceof SchemaError) {
        message = error.reason;
      }

      await errors.update((prev) => ({ ...prev, [field]: message }));
    };

    initial = () => {
      const start = Object.keys(schema).reduce((acc, key) => ({
        fields: {
          ...acc.fields,
          [key]: resolveDeep(schema[key]),
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
          validateDeepSchema(schema[key], key as keyof Data, data[key as keyof D])
        ));

        if (guard.some((item) => item instanceof SchemaError)) {
          const errors = guard.filter((item) => item instanceof SchemaError) as SchemaError[];
          throw new SchemaErrorList(errors);
        }
      }
    };

    field = async (field: keyof Data, value: Data[keyof Data], errors: Writable<Errors<Data>>): Promise<void> => {
      try {
        const guard = await validateDeepSchema(schema[field as string], field, value);

        if (guard instanceof SchemaError) throw guard;

        await this.#setError(field, errors);
      } catch (error) {
        await this.#setError(field, errors, error);
      }
    };

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
        return;
      }
    };
  }

  return new InternalAdapter();
}

// export async function fieldsValidation<T>(data: T, schema: unknown) {
//   if (schema instanceof ObjectSchema) {
//     const trasformedData = (typeof data === "object" && data) ? Object.keys(data).reduce((acc, key) => {
//       const field = (data as Record<string, unknown>)[key];
//       return {
//         ...acc,
//         [key]: field,
//       };
//     }, {}) : {};

//     await schema.validate(trasformedData, {
//       abortEarly: false,
//       strict: true,
//     });
//   }
// }

// export async function fieldValidation<T extends Writable<Errors> = Writable<Errors>>({
//   field: key,
//   value,
//   schema,
//   errors,
// }: FieldValidation<T>) {
//   try {
//     await schema.validate(transformOnOff(value), { abortEarly: false });
//     // setError({ errors, key });
//   } catch (error) {
//     // setError({ errors, key, error });
//   }
// }
