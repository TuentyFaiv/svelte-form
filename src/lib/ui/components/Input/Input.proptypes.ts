import type { GeneralInputProps } from "../../../logic/typing/globals.proptypes";

export interface Props extends GeneralInputProps {
  icons: {
    show: string;
    hide: string;
  } | null;
}

export type Input = HTMLInputElement | HTMLTextAreaElement | null;
