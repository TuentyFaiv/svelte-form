export interface SelectOption {
  key?: string;
  label: string;
  value: string;
  disabled?: boolean;
}

export interface OptionItem extends Omit<SelectOption, "key" | "disabled"> {
  id?: string;
  a11y?: {
    title?: string;
  }
}
