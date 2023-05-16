import { ObjectSchema } from "yup";

import type { Writable } from "svelte/store";
import type { FieldValidation } from "../typing/utils/validation.js";
import type { Errors } from "../typing/utils/errors.js";

import { setError } from "./errors.js";
import { transformOnOff } from "./booleans.js";

export async function fieldsValidation<T>(data: T, schema: unknown) {
  if (schema instanceof ObjectSchema) {
    const trasformedData = (typeof data === "object" && data) ? Object.keys(data).reduce((acc, key) => {
      const field = (data as Record<string, unknown>)[key];;
      return {
        ...acc,
        [key]: typeof field === "undefined" ? "" : field
      };
    }, {}) : {};

    await schema.validate(trasformedData, {
      abortEarly: false,
      strict: true,
    });
  }
}

export async function fieldValidation<
  T extends Writable<Errors> = Writable<Errors>
>({ event, schema, errors, ns }: FieldValidation<T>) {
  const { name: key, value } = (
    event instanceof Event
  ) ? event.target as HTMLInputElement : event;
  try {
    const field = schema[String(key)];
    await field.validate(transformOnOff(value), { abortEarly: false });
    setError({ errors, key, ns });
  } catch (error) {
    setError({ errors, key, error, ns });
  }
}
