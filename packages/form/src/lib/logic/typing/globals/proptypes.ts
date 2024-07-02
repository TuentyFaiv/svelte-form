export interface SharedUIProps {
  context?: string;
}

export interface GeneralFieldProps extends SharedUIProps {
  name: string;
  type?: string;
  label?: string | null;
  id?: string | null;
  datas?: Record<string, string | boolean | number>;
  clearOnDestroy?: boolean;
}
