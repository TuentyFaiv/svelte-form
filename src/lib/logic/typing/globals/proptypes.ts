import type { ObjStrCommon } from "./types.js";

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
