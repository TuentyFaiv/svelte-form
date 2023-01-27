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
  t(msg: string): string;
}

export type InputContext = Readable<FormContext>;
