import { Adapter } from "@tuentyfaiv/svelte-form";
import { ZodError, ZodObject } from "zod";

import type { Writable } from "svelte/store";
import type { DataErrors } from "@tuentyfaiv/svelte-form";
import type { ZodRawShape, infer as ZodInfer, ZodTypeAny } from "zod";
import type { ZodAdapterConfig } from "./zod.types.js";

class ZodAdapter<Schema extends ZodObject<ZodRawShape>, Data extends ZodInfer<Schema> = ZodInfer<Schema>> extends Adapter<Data> {
  #schema: Schema;
  #resolveDeep: (three: ZodTypeAny) => null | undefined;

  constructor(config: ZodAdapterConfig<Schema>) {
    super();

    this.#schema = config.schema;
    this.#resolveDeep = config.resolveDeep;

    Object.freeze(this);
  }

  // eslint-disable-next-line class-methods-use-this
  #setError = async (field: keyof Data, errros: Writable<DataErrors<Data>>, error?: unknown) => {
    let message: string | null = null;
    if (error instanceof ZodError) {
      message = error.issues.reduce((_, issue) => issue.message, "");
    }

    await errros.update((prev) => ({ ...prev, [field]: message }));
  };

  initial = () => {
    const start = Object.entries(this.#schema.shape).reduce((acc, [key, three]) => ({
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
    await this.#schema.parse(data);
  };

  field = async (field: keyof Data, value: Data[keyof Data], errors: Writable<DataErrors<Data>>): Promise<void> => {
    try {
      this.#schema.shape[field as string].parse(value);

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

    if (error instanceof ZodError) {
      const messages = error.issues.reduce((acc, issue) => ({
        ...acc,
        [issue.path.join(".")]: issue.message,
      }), {});

      await errors.update((prev) => ({
        ...prev,
        ...messages,
      }));
    }
  };
}

export function adapter<Schema extends ZodObject<ZodRawShape>, Data extends ZodInfer<Schema> = ZodInfer<Schema>>(schema: Schema) {
  function resolveDeep(three: ZodTypeAny): null | undefined {
    if (three instanceof ZodObject) {
      return Object.entries(three.shape as ZodObject<ZodRawShape>).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: resolveDeep(value),
      }), {} as Data[keyof Data]);
    }

    if (three.isNullable()) {
      return null;
    }

    if (three.isOptional()) {
      return undefined;
    }

    return null;
  }

  return new ZodAdapter({
    schema,
    resolveDeep,
  });
}
