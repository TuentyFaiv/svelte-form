/* eslint-disable max-classes-per-file */
import type { FormErrorConfig, SchemaErrorConfig } from "../typing/utils/errors.js";

export class FormError extends Error {
  title: FormErrorConfig["title"];
  reason: FormErrorConfig["reason"];
  message: FormErrorConfig["message"];
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

export class SchemaError extends Error {
  title: string;
  field: SchemaErrorConfig["field"];
  reason: SchemaErrorConfig["reason"];
  schema: SchemaErrorConfig["schema"];
  value: SchemaErrorConfig["value"];
  date: Date;

  constructor(config: SchemaErrorConfig, ...params: (string | undefined)[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SchemaError);
    }

    this.name = "SchemaError";
    this.title = "!Field error¡";
    this.field = config.field;
    this.reason = config.reason;
    this.schema = config.schema;
    this.value = config.value;
    this.message = config.message;

    this.date = new Date();
  }
}

export class SchemaErrorList extends Error {
  title: string;
  errors: SchemaError[];
  date: Date;

  constructor(errors: SchemaError[], ...params: (string | undefined)[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SchemaErrorList);
    }

    this.name = "SchemaErrorList";
    this.title = "!Fields error¡";
    this.errors = errors;
    this.date = new Date();
  }
}

// export function showErrors<T>({ error, errors }: ConfigShowErrors<T>) {
//   if (error instanceof ValidationError) {
//     return error.inner.reduce((acc, err) => ({
//       ...acc,
//       [`${err.path}`]: err.message,
//     }), { ...errors });
//   }
//   return errors;
// }

// export function setErrors<T extends Errors = Errors>({ error, errors, handle }: ConfigErrors<T>) {
//   if (!(error instanceof ValidationError) || !(error instanceof FormError)) {
//     handle?.(error);
//   }

//   errors.update((prevErrors) => {
//     const resetErrors = Object.keys(prevErrors).reduce((acc, key) => ({
//       ...acc,
//       [key]: null,
//     }), prevErrors);
//     const newErrors = showErrors({ error, errors: resetErrors });

//     return newErrors;
//   });
// }

// export function setError<TKey extends string | number | symbol, TErr extends Errors = Errors>({
//   error,
//   errors,
//   key,
// }: ConfigError<TKey, TErr>) {
//   let message: string | null = null;

//   if (error instanceof ValidationError) {
//     message = error.inner.reduce((_, err) => (err.message), "");
//   }
//   if (typeof error === "string") {
//     message = error;
//   }
//   errors.update((prevErrors) => ({
//     ...prevErrors,
//     [String(key)]: message,
//   }));
// }
