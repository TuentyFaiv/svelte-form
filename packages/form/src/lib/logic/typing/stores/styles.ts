import type {
  ErrorsStyles,
  FileStyles,
  FieldStyles,
  OptionStyles,
  SelectStyles,
} from "../globals/styles.js";

export interface ContextStyles {
  /** Set to true to replace the default styles  @default false */
  replace?: boolean;
  /** Styles for the field component */
  field?: FieldStyles | null;
  /** Styles for the file component */
  file?: FileStyles | null;
  /** Styles for the select component */
  select?: SelectStyles | null;
  /** Styles for the option component */
  option?: OptionStyles | null;
  /** Styles for the errors component */
  errors?: ErrorsStyles | null;
}
