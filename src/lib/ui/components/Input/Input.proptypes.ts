import type { GeneralInputProps } from "$lib/logic/typing/globals.proptypes";

export interface Props extends GeneralInputProps {
  icons: {
    show: string;
    hide: string;
  } | null;
}

export type Input = HTMLInputElement | HTMLTextAreaElement | null;
