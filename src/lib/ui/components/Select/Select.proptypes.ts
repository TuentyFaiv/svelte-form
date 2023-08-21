import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralFieldProps {
  options: SelectOption[];
  multiple: boolean;
  disabled: boolean;
  searchable: boolean;
  placeholder: string | null;
}

export type Target = HTMLDivElement | HTMLParagraphElement | HTMLSpanElement;

export type Select = HTMLDivElement | null;
