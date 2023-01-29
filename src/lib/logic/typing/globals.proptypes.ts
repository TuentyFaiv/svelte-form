import type { Readable } from "svelte/store";
import type { ObjStrCommon } from "./globals.types";
import type { FormContext } from "./stores.form";

export interface GeneralInputProps {
  type: string;
  name: string;
  label: string;
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

export interface SigninFormStyles {
  form?: string;
  box?: string;
  submit?: string;
}

export type InputContext = Readable<FormContext>;
