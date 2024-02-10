import { Adapter } from "@tuentyfaiv/svelte-form";
import { ObjectSchema, ValidationError } from "yup";

import type { DataErrors } from "@tuentyfaiv/svelte-form";
import type { Writable } from "svelte/store";
import type { AnyObject, AnySchema, InferType } from "yup";
import type { YupAdapterConfig } from "./yup.types.js";

class YupAdapter<
Schema extends ObjectSchema<AnyObject>,
Data extends InferType<Schema> = InferType<Schema>,
> extends Adapter<Data> {
  #schema: YupAdapterConfig<Schema>["schema"];
  #resolveDeep: YupAdapterConfig<Schema>["resolveDeep"];

  constructor(config: YupAdapterConfig<Schema>) {
    super();

    this.#schema = config.schema;
    this.#resolveDeep = config.resolveDeep;

    Object.freeze(this);
  }

  // eslint-disable-next-line class-methods-use-this
  #setError = async (field: keyof Data, errros: Writable<DataErrors<Data>>, error?: unknown) => {
    let message: string | null = null;
    if (error instanceof ValidationError) {
      message = error.inner.reduce((_, issue) => issue.message, "");
    }

    await errros.update((prev) => ({ ...prev, [field]: message }));
  };

  initial = () => {
    const start = Object.entries(this.#schema.fields).reduce((acc, [key, three]) => ({
      fields: {
        ...acc.fields,
        [key]: this.#resolveDeep(three),
      },
      errors: {
        ...acc.errors,
        [key]: null,
      },
    }), {
      fields: {} as Data,
      errors: {} as DataErrors<Data>,
    });

    return start;
  };

  validate = async <T = Data>(data: T): Promise<void> => {
    await this.#schema.validate(data, { abortEarly: false, strict: true });
  };

  field = async (field: keyof Data, value: Data[keyof Data], errors: Writable<DataErrors<Data>>): Promise<void> => {
    try {
      await (this.#schema.fields[field as string] as AnySchema).validate(value, { abortEarly: false, strict: true });
      await this.#setError(field, errors);
    } catch (error) {
      await this.#setError(field, errors, error);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  errors = async (
    error: unknown,
    errors: Writable<DataErrors<Data>>,
    handle?: (error: unknown) => (void | Promise<void>),
  ): Promise<void> => {
    await handle?.(error);

    if (error instanceof ValidationError) {
      const messages = error.inner.reduce((acc, issue) => ({
        ...acc,
        [String(issue.path)]: issue.message,
      }), {} as Partial<DataErrors<Data>>);
      errors.update((prev) => ({
        ...prev,
        ...messages,
      }));
    }
  };
}

export function adapter<
Schema extends ObjectSchema<AnyObject>,
Data extends InferType<Schema> = InferType<Schema>,
>(schema: Schema) {
  const resolveDeep: YupAdapterConfig<Schema>["resolveDeep"] = (three) => {
    if (three instanceof ObjectSchema) {
      return Object.entries(three.fields).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: resolveDeep(value),
      }), {} as Data[keyof Data]);
    }

    return null;
  };

  return new YupAdapter({ schema, resolveDeep });
}
