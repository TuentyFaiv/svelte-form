import type { GeneralInputProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralInputProps {
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
  | "textarea"
  placeholder?: string;
}

export type Input = HTMLInputElement | HTMLTextAreaElement | null;
