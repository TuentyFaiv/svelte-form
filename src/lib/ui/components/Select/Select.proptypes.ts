import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
import type { GeneralInputProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralInputProps {
  options: SelectOption[];
  placeholder: string | null;
}

export type Target = HTMLDivElement | HTMLParagraphElement | HTMLSpanElement;

export type Select = HTMLDivElement | null;
