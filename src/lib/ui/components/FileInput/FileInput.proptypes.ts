import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralFieldProps {
  max: number;
  accept: string;
  alt: string | null;
  multiple: boolean;
  defaultValue: string;
}

export type Input = HTMLInputElement | null;
