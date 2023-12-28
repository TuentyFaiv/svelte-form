interface GeneralStyles {
  field?: string;
  input?: string;
  label?: string;
  error?: string;
  icon?: string;
}

export interface CssVars {
  space?: string;
  primary?: string;
  primaryOpacity?: string;
  secondary?: string;
  secondaryOpacity?: string;
  accent?: string;
  error?: string;
  warning?: string;
  success?: string;
  shadow?: string;
  shadowOpacity?: string;
  shadowSize?: string;
  shadowColor?: string;
  border?: string;
  borderWidth?: string;
  borderStyle?: string;
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
  item?: string;
  remove?: string;
  searchable?: string;
  clear?: string;
  empty?: string;
}

export interface FieldStyles extends GeneralStyles {
  area?: string;
  check?: string;
  action?: string;
  hide?: string;
  show?: string;
}

export interface FileStyles extends GeneralStyles {
  wrapper?: string;
  retry?: string;
  cover?: string;
  remove?: string;
  item?: string;
}

export interface OptionStyles extends GeneralStyles {
  content?: string;
  options?: string;
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
