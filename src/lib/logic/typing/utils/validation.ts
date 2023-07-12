import type { AnySchema } from "yup";

export type FieldValidation<T > = {
  schema: AnySchema;
  field: string | number | symbol;
  value: unknown;
  errors: T;
};
