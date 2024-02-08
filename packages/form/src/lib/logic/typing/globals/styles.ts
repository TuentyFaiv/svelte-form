interface GeneralStyles {
  container?: string;
  label?: string;
  input?: string;
  error?: string;
  icon?: string;
}

export interface FieldStyles extends GeneralStyles {
  area?: string;
  check?: string;
  action?: string;
  checked?: string;
  hide?: string;
  show?: string;
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
  nonsearchable?: string;
  clear?: string;
  empty?: string;
}

export interface OptionStyles extends Omit<GeneralStyles, "icon"> {
  content?: string;
  legend?: string;
  option?: string;
}

export interface FileStyles extends Omit<GeneralStyles, "icon"> {
  content?: string;
  retry?: string;
  cover?: string;
  remove?: string;
  items?: string;
  item?: string;
}

export interface ErrorsStyles {
  list?: string;
  item?: string;
}

export interface Icons {
  checked?: string;
  hide?: string;
  show?: string;
  clear?: string;
  arrow?: string;
  remove?: string;
  retry?: string;
}
