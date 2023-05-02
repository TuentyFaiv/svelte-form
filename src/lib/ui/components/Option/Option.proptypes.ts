import type { GeneralInputProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralInputProps {
  id: string;
  value: string;
  checked: string;
}

export type Option = HTMLInputElement | null;
