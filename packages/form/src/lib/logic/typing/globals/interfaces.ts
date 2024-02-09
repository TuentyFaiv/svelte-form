export interface SelectOption {
  key?: string;
  label: string;
  value: string;
  fixed?: boolean;
  disabled?: boolean;
}

export interface OptionItem extends Omit<SelectOption, "fixed" | "label"> {
  label?: string;
}
