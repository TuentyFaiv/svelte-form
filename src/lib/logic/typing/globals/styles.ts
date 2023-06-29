interface GeneralStyles {
  field?: string;
  input?: string;
  label?: string;
  error?: string;
}

export interface SelectStyles extends Omit<GeneralStyles, "input"> {
  select?: string;
  value?: string;
  options?: string;
  option?: string;
  icon?: string;
}

export interface InputStyles extends GeneralStyles {
  area?: string;
  check?: string;
  show?: string;
  icon?: string;
}

export interface FileInputStyles extends Omit<GeneralStyles, "label"> {
  wrapper?: string;
  actions?: string;
  retry?: string;
}

export interface OptionStyles extends GeneralStyles {
  content?: string;
}

export interface ErrorsStyles {
  list?: string;
  item?: string;
}

export interface Icons {
  show?: string;
  hide?: string;
  arrow?: string;
}
