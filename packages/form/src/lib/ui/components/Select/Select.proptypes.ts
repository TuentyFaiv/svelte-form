import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralFieldProps {
  options: SelectOption[];
  multiple: boolean;
  disabled: boolean;
  searchable: boolean;
  placeholder: string | null;
  autoselectable: boolean;
  clearable: ((values: string[] | string) => boolean) | boolean;
}

export interface Events {
  choose: string;
}

export type Target = HTMLDivElement | HTMLParagraphElement | HTMLSpanElement;

export type Select = HTMLDivElement | null;
