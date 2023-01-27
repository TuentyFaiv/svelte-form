import { ObjectSchema } from "yup";

import type { Writable } from "svelte/store";
import type { FieldValidation } from "../typing/utils.validation";
import type { Errors } from "../typing/utils.errors";

import { setError } from "./errors";

export async function fieldsValidation<T>(data: T, schema: unknown) {
  if (schema instanceof ObjectSchema) {
    await schema.validate(data, { abortEarly: false });
  }
}

export async function fieldValidation<
  T extends Writable<Errors> = Writable<Errors>
>({ event, schema, errors, ns }: FieldValidation<T>) {
  const { name: key, value, checked, type } = (
    event instanceof FocusEvent || event instanceof Event
  ) ? event.target as HTMLInputElement : event;

  const isCheckbox = (typeof checked === "boolean") && (type === "checkbox");
  const toCheck = isCheckbox ? checked : value;

  try {
    const field = schema[key];
    await field.validate(toCheck, { abortEarly: false });
    setError({ errors, key, ns });
  } catch (error) {
    setError({ errors, key, error, ns });
  }
}
