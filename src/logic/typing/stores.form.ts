import type { Writable } from "svelte/store";
import type { AnySchema } from "yup";
import type { Errors } from "./utils.errors";
import type { ObjStrCustom } from "./globals.types";

export interface FormContext {
  loading: Writable<boolean>;
  errors: Writable<Errors>;
  data: Writable<Data>;
  setError(name: string, error?: unknown): void;
  setField(field: string, value: unknown, validate?: boolean): Promise<void>;
  check(event: FocusEvent | Event): Promise<void>;
  action(data?: ActionConfig): Promise<void>;
  submit<D extends Data = Data>(
    handleData: Submit<D>,
    {
      error,
      finish,
      contextns
    }?: SubmitActions
  ): (event: SubmitEvent) => Promise<void>;
}

export type Data = ObjStrCustom<unknown>;

export type Fields = ObjStrCustom<AnySchema>;

export interface ActionConfig {
  title?: string;
  message?: string;
  type?: "info" | "warning" | "success";
}

export type Submit<T> = (values: T) => void;

export interface SubmitActions {
  error?(error: unknown): void;
  finish?: VoidFunction;
  contextns?: string;
}
