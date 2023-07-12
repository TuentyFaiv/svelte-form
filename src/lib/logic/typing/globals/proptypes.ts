// import type { Readable } from "svelte/store";
// import type { AnyObject } from "yup";
import type { ObjStrCommon } from "./types.js";
// import type { ContextForm } from "./contexts.js";
// import type { SharedFormStyles } from "./styles.js";

export interface SharedUIProps {
  context: string;
}

export interface GeneralFieldProps extends SharedUIProps {
  type: string;
  name: string;
  label: string | null;
  id: string | null;
  datas: ObjStrCommon;
}

export interface GeneralInputProps extends GeneralFieldProps {
  type: "text"
  | "checkbox"
  | "color"
  | "date"
  | "email"
  | "hidden"
  | "month"
  | "number"
  | "password"
  | "range"
  | "search"
  | "tel"
  | "time"
  | "url"
  | "textarea";
}

// export interface GlobalFormProps extends SharedUIProps {
//   styles?: Partial<FormStyles>;
//   showErrors?: boolean;
// }

// export interface FormStyles extends ContextStyles {
//   form: SharedFormStyles;
// }

// export type InputContext = Readable<ContextForm<AnyObject, string>>;

// export type TextsProp<T extends string> = {
//   [key in T]: TextProp;
// };

// export type TextProp = string | TextPropExplicit;

// export interface TextPropExplicit {
//   placeholder: string;
//   label: string;
// }
