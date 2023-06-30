import type { AnySchema } from "yup";
import type { ObjStrCustom } from "../globals/types.js";

export type FieldValidation<T> = {
  schema: ObjStrCustom<AnySchema>;
  event: FocusEvent | Event | Field;
  errors: T;
};

export interface Field {
  name: string | number | symbol;
  value: unknown;
  checked?: unknown;
  type?: string;
}
