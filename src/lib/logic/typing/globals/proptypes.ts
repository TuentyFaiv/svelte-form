import type { Readable } from "svelte/store";
import type { AnyObject } from "yup";
import type { ObjStrCommon } from "./types.js";
import type {
  FormContext,
  Message,
  StoreConfig,
  StoreStyles,
  SubmitOptions,
} from "../stores/form.js";

export interface GeneralInputProps {
  type: string;
  name: string;
  label: string | null;
  id: string | null;
  context: string;
  datas: ObjStrCommon;
  t: Message;
}

export interface GlobalFormProps extends Pick<StoreConfig<unknown>, "ns"> {
  context: SubmitOptions["context"];
  styles?: Partial<StylesForm>;
  showErrors?: boolean;
  t: Message;
}

export type FormStyles = Required<GlobalFormProps>["styles"]["form"];

export interface StylesForm extends StoreStyles {
  form: GlobalFormStyles;
}

interface GlobalFormStyles {
  container?: string;
  box?: string;
  submit?: string;
}

export type InputContext = Readable<FormContext<AnyObject, string>>;

export interface Text {
  placeholder: string;
  label: string;
}
