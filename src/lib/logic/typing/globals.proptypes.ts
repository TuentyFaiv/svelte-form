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

export interface SelectStyles {
  field?: string;
  label?: string;
  select?: string;
  value?: string;
  error?: string;
  options?: string;
  option?: string;
}

export interface InputStyles {
  field?: string;
  label?: string;
  area?: string;
  check?: string;
  input?: string;
  show?: string;
  icon?: string;
  error?: string;
}

export interface FileInputStyles {
  wrapper?: string;
  actions?: string;
  error?: string;
  retry?: string;
  field?: string;
  input?: string;
}

export interface OptionStyles {
  field?: string;
  label?: string;
  input?: string;
  content?: string;
  error?: string;
}

export type InputContext = Readable<FormContext>;
