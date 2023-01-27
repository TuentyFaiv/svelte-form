import type { SelectOption } from "../../../logic/typing/globals.interfaces";
import type { GeneralInputProps } from "../../../logic/typing/globals.proptypes";

export interface Props extends GeneralInputProps {
  options: SelectOption[];
  placeholder: string | null;
  onSelect(value: string): void;
  styles: {
    field?: string;
    paragraph?: string;
    select?: string;
    value?: string;
    error?: string;
    options?: string;
    option?: string;
  }
}

export type Target = HTMLDivElement | HTMLParagraphElement | HTMLSpanElement;

export type Select = HTMLDivElement | null;
