export interface Props {
  label: string;
  name: string;
  id: string;
  context: string;
  value: string;
  checked: string;
  onSelect: ((value: string) => void) | null;
}

export type Option = HTMLInputElement | null;
