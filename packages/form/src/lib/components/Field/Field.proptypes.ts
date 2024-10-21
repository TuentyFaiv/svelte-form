import type { HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";
import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";
import type { FieldStyles } from "$lib/logic/typing/globals/styles.js";
import type { UserEvent } from "$lib/logic/typing/globals/types.js";

type InputAttrs = Pick<
HTMLInputAttributes,
// type Text
"inputmode"
| "maxlength"
| "minlength"
| "pattern"
| "size"
| "spellcheck"
// type Number
| "max"
| "min"
| "step"
// type Checkbox
| "indeterminate"
// General
| "list"
| "placeholder"
| "autocomplete"
| "readonly"
| "disabled"
| "required"
// Non standard
| "autocorrect"
// WAI-ARIA
>;

type TextAreaAttrs = Pick<
HTMLTextareaAttributes,
"cols"
| "rows"
| "autocapitalize"
| "autofocus"
| "dirname"
| "wrap"
>;

export interface Props extends GeneralFieldProps, InputAttrs, TextAreaAttrs {
  styles?: FieldStyles;
  type?: "text"
  | "number"
  | "checkbox"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "search"
  | "textarea";
  a11y?: {
    icon?: string;
    title?: string;
  };
  onblur?: (event: UserEvent<HTMLInputElement | HTMLTextAreaElement, FocusEvent | Event>) => void;
  onfocus?: (event: UserEvent<HTMLInputElement | HTMLTextAreaElement, FocusEvent | Event>) => void;
  oninput?: (event: UserEvent<HTMLInputElement | HTMLTextAreaElement, InputEvent | Event>) => void;
}

export type Input = HTMLInputElement | HTMLTextAreaElement | null;
