interface GeneralStyles {
  field?: string;
  input?: string;
  label?: string;
  error?: string;
  icon?: string;
}

// export interface SharedFormStyles {
//   container?: string;
//   box?: string;
//   submit?: string;
// }

export interface CssVars {
  primary?: string;
  secondary?: string;
  accent?: string;
  error?: string;
  warning?: string;
  success?: string;
  shadow?: string;
  border?: string;
  text?: string;
  placeholder?: string;
  radius?: string;
  texterror?: string;
  font?: string;
}

export interface SelectStyles extends Omit<GeneralStyles, "input"> {
  select?: string;
  value?: string;
  options?: string;
  option?: string;
  arrow?: string;
}

export interface FieldStyles extends GeneralStyles {
  area?: string;
  check?: string;
  action?: string;
  hide?: string;
  show?: string;
}

export interface FileStyles extends Omit<GeneralStyles, "label"> {
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
  check?: string;
}
