import type { GeneralInputProps } from "@typing/globals.proptypes";

export interface Props extends GeneralInputProps {
  t(msg: string): string;
  icons: {
    show: string;
    hide: string;
  } | null;
}

export type Input = HTMLInputElement | HTMLTextAreaElement | null;
