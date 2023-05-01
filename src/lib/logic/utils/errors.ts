import { ValidationError } from "yup";

import type { ConfigError, ConfigErrors, ConfigShowErrors, Errors } from "../typing/utils/errors.js";

export class FormError extends Error {
  title: string;
  date: Date;

  constructor(
    title = "!Form Error¡",
    ...params: (string | undefined)[]
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FormError);
    }

    this.name = "FormError";
    this.title = title;
    this.date = new Date();
  }
}

export function showErrors<T>({ error, errors, ns = "errors" }: ConfigShowErrors<T>) {
  if (error instanceof ValidationError) {
    return error.inner.reduce((acc, err) => ({
      ...acc,
      [`${err.path}`]: `${ns}:${err.message.includes("`number` type") ? "type-number" : err.message}`
    }), { ...errors });
  }
  return errors;
}

export function setErrors<T extends Errors = Errors>({ error, errors, ns = "errors", handle }: ConfigErrors<T>) {
  if (!(error instanceof ValidationError)) {
    handle?.(error);
  }
  if ((error instanceof FormError)) return;

  errors.update((prevErrors) => {
    const resetErrors = Object.keys(prevErrors).reduce((acc, key) => ({
      ...acc,
      [key]: null
    }), prevErrors);
    const newErrors = showErrors({ error, errors: resetErrors, ns });

    return newErrors;
  });
}

export function setError<TKey, TErr extends Errors = Errors>({ error, errors, key, ns = "errors" }: ConfigError<TKey, TErr>) {
  let message: string | null = null;

  if (error instanceof ValidationError) {
    message = error.inner.reduce((_, err) => (
      `${ns}:${err.message.includes("`number` type") ? "type-number" : err.message}`
    ), "");
  }
  if (typeof error === "string") {
    message = error;
  }
  errors.update((prevErrors) => ({
    ...prevErrors,
    [key as string]: message
  }));
}
