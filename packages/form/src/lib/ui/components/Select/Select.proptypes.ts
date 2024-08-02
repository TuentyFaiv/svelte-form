import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";
import type { SelectStyles } from "$lib/logic/typing/globals/styles.js";

export interface Props extends Omit<GeneralFieldProps, "type"> {
  options: SelectOption[];
  styles?: SelectStyles;
  multiple?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  placeholder?: string | null;
  autoselect?: boolean;
  clearable?: boolean;
  parent?: HTMLElement;
}

export interface Events {
  choose: SelectOption;
  remove: SelectOption;
  clear: void;
}

export type Target = HTMLDivElement | HTMLParagraphElement | HTMLSpanElement;
