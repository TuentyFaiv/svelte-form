import type { ArraySchema, FieldPropSchema, FieldsSchema, Schema } from "../stores/form.js";

export type Errors<T> = {
  [key in keyof T]: string | null;
};

export interface FormErrorConfig {
  title?: string;
  message: string;
  reason: string;
}

export interface SchemaErrorConfig {
  field: string;
  reason: string;
  message: string;
  schema: FieldPropSchema<Schema> | FieldsSchema | ArraySchema | Schema;
  value: unknown;
}
