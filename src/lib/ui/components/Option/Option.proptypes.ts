import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralFieldProps {
  id: string;
  value: string;
  checked: string;
  a11y: {
    title?: string;
  }
}

export type Option = HTMLInputElement | null;
