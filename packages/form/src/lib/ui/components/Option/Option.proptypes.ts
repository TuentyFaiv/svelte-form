import type { OptionItem } from "$lib/logic/typing/globals/interfaces.js";
import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends Omit<GeneralFieldProps, "id" | "label" | "type"> {
  options: OptionItem[];
  disabled: boolean;
}

export interface Events {
  choose: string;
}

export type Option = HTMLInputElement | null;
