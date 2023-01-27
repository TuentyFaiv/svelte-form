import type { AnySchema } from "yup";
import type { ObjStrCustom } from "./globals.types";

export type FieldValidation<T> = {
  schema: ObjStrCustom<AnySchema>;
  event: FocusEvent | Event | Field;
  errors: T;
  ns?: string;
};

export interface Field {
  name: string;
  value: unknown;
  checked?: unknown;
  type?: string;
}
