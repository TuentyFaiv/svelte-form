import type { Readable } from "svelte/store";
import type { AnyObject } from "yup";
import type { ObjStrCommon } from "./types.js";
import type { ContextStyles, ContextForm } from "./contexts.js";
import type { SharedFormStyles } from "./styles.js";
import type {
  Message,
  FormStoreConfig,
  SubmitOptions,
} from "../stores/form.js";

export interface SharedUIProps extends Pick<FormStoreConfig<unknown>, "ns"> {
  t: Message;
  context: string;
}

export interface GeneralInputProps extends SharedUIProps {
  type: string;
  name: string;
  label: string | null;
  id: string | null;
  datas: ObjStrCommon;
}

export interface GlobalFormProps extends SharedUIProps {
  styles?: Partial<FormStyles>;
  showErrors?: boolean;
}

export interface FormStyles extends ContextStyles {
  form: SharedFormStyles;
}

export type InputContext = Readable<ContextForm<AnyObject, string>>;

export type TextProp = string | {
  placeholder: string;
  label: string;
};
