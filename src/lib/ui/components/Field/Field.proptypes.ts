import type { GeneralInputProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GeneralInputProps {
  a11y: {
    icon?: string;
    title?: string;
  }
}

export type Input = HTMLInputElement | HTMLTextAreaElement | null;
