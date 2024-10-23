import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";
import type { OptionItem } from "$lib/logic/typing/globals/interfaces.js";
import type { OptionStyles } from "$lib/logic/typing/globals/styles.js";

export interface Props extends Omit<GeneralFieldProps, "type"> {
  options: OptionItem[];
  styles?: OptionStyles;
  multiple?: boolean;
  disabled?: boolean;
  onchoose?: (option: OptionItem) => void;
}

export type Option = HTMLInputElement | null;
