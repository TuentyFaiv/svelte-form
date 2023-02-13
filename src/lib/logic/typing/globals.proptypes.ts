import type { Readable } from "svelte/store";
import type { AnyObject } from "yup";
import type { ObjStrCommon } from "./globals.types";
import type { FormContext, Message, StoreStyles, SubmitAction, SubmitOptions } from "./stores.form";

export interface GeneralInputProps {
  type: string;
  name: string;
  label: string | null;
  id: string | null;
  context: string;
  datas: ObjStrCommon;
}

interface GeneralStyles {
  field?: string;
  input?: string;
  label?: string;
  error?: string;
}

export interface SelectStyles extends Omit<GeneralStyles, "input"> {
  select?: string;
  value?: string;
  options?: string;
  option?: string;
}

export interface InputStyles extends GeneralStyles {
  area?: string;
  check?: string;
  show?: string;
  icon?: string;
}

export interface FileInputStyles extends Omit<GeneralStyles, "label"> {
  wrapper?: string;
  actions?: string;
  retry?: string;
}

export interface OptionStyles extends GeneralStyles {
  content?: string;
}

export interface ErrorsStyles {
  list?: string;
  item?: string;
}

export interface GlobalFormProps<T> {
  onSubmit: SubmitAction<T>;
  onError: SubmitOptions["error"];
  onFinish: SubmitOptions["finish"];
  context: SubmitOptions["contextns"];
  ns?: string;
  t?: Message;
  styles?: Partial<StylesForm>;
  showErrors?: boolean;
}

export type FormStyles = GlobalFormProps<unknown>["styles"];

export interface StylesForm extends StoreStyles {
  form: GlobalFormStyles;
}

interface GlobalFormStyles {
  container?: string;
  box?: string;
  submit?: string;
}

export type InputContext = Readable<FormContext<AnyObject, string>>;
