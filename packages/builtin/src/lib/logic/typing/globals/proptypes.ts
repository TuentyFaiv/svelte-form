import type { ContextStyles, SharedUIProps } from "@tuentyfaiv/svelte-form";
import type { SharedFormStyles } from "./styles.js";

export interface GlobalFormProps extends SharedUIProps {
  styles?: Partial<FormStyles>;
  showErrors?: boolean;
}

export interface FormStyles extends ContextStyles {
  form: SharedFormStyles;
}

export type TextsProp<T extends string> = {
  [key in T]?: TextProp;
};

export type TextProp = string | TextPropExplicit;

export interface TextPropExplicit {
  placeholder?: string;
  label: string;
}
