export interface SharedUIProps {
  context?: string;
}

export type GeneralFieldProps = SharedUIProps & {
  name: string;
  type?: string;
  label?: string | null;
  id?: string | null;
  clearOnDestroy?: boolean;
} & {
  [key: `data-${string}`]: string | number | boolean | null | undefined;
};
