import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends Omit<GeneralFieldProps, "type"> {
  max: number;
  accept: string;
  multiple: boolean;
  dragable: boolean;
}
export interface Events {
  choose: File | File[];
  retry: undefined;
}

export type Input = HTMLInputElement | null;
