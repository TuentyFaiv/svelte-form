import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";
import type { FileStyles } from "$lib/logic/typing/globals/styles.js";

export interface Props extends Omit<GeneralFieldProps, "type"> {
  max?: number;
  accept?: string;
  multiple?: boolean;
  dragable?: boolean;
  styles?: FileStyles;
  disabled?: boolean;
}
export interface Events {
  choose: File | File[];
  retry: void;
  remove: void;
}

export type Input = HTMLInputElement | null;
