import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralFieldProps {
  options: SelectOption[];
  placeholder: string | null;
}

export type Target = HTMLDivElement | HTMLParagraphElement | HTMLSpanElement;

export type Select = HTMLDivElement | null;
