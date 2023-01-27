import type { GeneralInputProps } from "../../../logic/typing/globals.proptypes";

export interface Props extends GeneralInputProps {
  max: number;
  accept: string;
  alt: string | null;
  multiple: boolean;
  defaultValue: string;
  onSelect: null | ((value: File | File[]) => void);
  onRetry: null | VoidFunction;
  styles: {
    wrapper?: string;
    actions?: string;
    error?: string;
    retry?: string;
    field?: string;
    input?: string;
  }
}

export type Input = HTMLInputElement | null;
