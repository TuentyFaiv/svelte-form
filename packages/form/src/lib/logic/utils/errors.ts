import { ValidationError } from "yup";

import type {
  FormErrorConfig,
  ConfigError,
  ConfigErrors,
  ConfigShowErrors,
  Errors,
} from "../typing/utils/errors.js";

export class FormError extends Error {
  title: string;
  reason: string;
  message: string;
  date: Date;

  constructor(
    {
      title = "!Form Error¡",
      message,
      reason,
    }: FormErrorConfig,
    ...params: (string | undefined)[]
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FormError);
    }

    this.name = "FormError";
    this.title = title;
    this.message = message;
    this.reason = reason;
    this.date = new Date();
  }
}

export function showErrors<T>({ error, errors }: ConfigShowErrors<T>) {
  if (error instanceof ValidationError) {
    return error.inner.reduce((acc, err) => ({
      ...acc,
      [`${err.path}`]: err.message,
    }), { ...errors });
  }
  return errors;
}

export function setErrors<T extends Errors = Errors>({ error, errors, handle }: ConfigErrors<T>) {
  if (!(error instanceof ValidationError) || !(error instanceof FormError)) {
    handle?.(error);
  }

  errors.update((prevErrors) => {
    const resetErrors = Object.keys(prevErrors).reduce((acc, key) => ({
      ...acc,
      [key]: null,
    }), prevErrors);
    const newErrors = showErrors({ error, errors: resetErrors });

    return newErrors;
  });
}

export function setError<TKey extends string | number | symbol, TErr extends Errors = Errors>({
  error,
  errors,
  key,
}: ConfigError<TKey, TErr>) {
  let message: string | null = null;

  if (error instanceof ValidationError) {
    message = error.inner.reduce((_, err) => (err.message), "");
  }
  if (typeof error === "string") {
    message = error;
  }
  errors.update((prevErrors) => ({
    ...prevErrors,
    [String(key)]: message,
  }));
}
