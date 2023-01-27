import type { GeneralInputProps } from "../../../logic/typing/globals.proptypes";

export interface Props extends GeneralInputProps {
  icons: {
    show: string;
    hide: string;
  } | null;
  styles: {
    field?: string;
    paragraph?: string;
    area?: string;
    check?: string;
    input?: string;
    show?: string;
    icon?: string;
    error?: string;
  }
}

export type Input = HTMLInputElement | HTMLTextAreaElement | null;
