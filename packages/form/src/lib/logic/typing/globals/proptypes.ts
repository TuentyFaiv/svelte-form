export interface SharedUIProps {
  context: string;
}

export interface GeneralFieldProps extends SharedUIProps {
  type: string;
  name: string;
  label: string | null;
  id: string | null;
  datas: Record<string, string | boolean | number>;
}

export interface GeneralInputProps extends GeneralFieldProps {
  type: "text"
  | "checkbox"
  | "date"
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "time"
  | "url"
  | "textarea";
}
