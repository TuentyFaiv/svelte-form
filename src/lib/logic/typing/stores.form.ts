import type { Writable } from "svelte/store";
import type { AnySchema } from "yup";
import type { Errors } from "./utils.errors";
import type { ObjStrCustom } from "./globals.types";
import type { FileInputStyles, InputStyles, OptionStyles, SelectStyles } from "./globals.proptypes";

export interface StoreConfig {
  fields: Fields;
  ns?: string;
  t?: Message;
  styles?: Styles;
}

export interface Styles {
  input: InputStyles;
  fileinput:FileInputStyles;
  select: SelectStyles;
  option: OptionStyles;
  icons: Icons | null;
}

interface Icons {
  show?: string;
  hide?: string;
}

export interface FormContext {
  loading: Writable<boolean>;
  errors: Writable<Errors>;
  data: Writable<Data>;
  setError(name: string, error?: unknown): void;
  setField(field: string, value: unknown, validate?: boolean): Promise<void>;
  check(event: FocusEvent | Event): Promise<void>;
  action(data?: ActionConfig): Promise<void>;
  submit<T extends Data = Data>(action: SubmitAction<T>, options?: SubmitOptions): Submit;
  t: Message;
  styles: Styles;
}

export type Data = ObjStrCustom<unknown>;

export type Fields = ObjStrCustom<AnySchema>;

export interface ActionConfig {
  title?: string;
  message?: string;
  type?: "info" | "warning" | "success";
}

type Submit = (event: SubmitEvent) => Promise<void>;

export type Message = (msg: string) => string;

export type SubmitAction<T> = (values: T) => void;

export interface SubmitOptions {
  error?(error: unknown): void;
  finish?: VoidFunction;
  contextns?: string;
}
