import type {
  ErrorsStyles,
  FileStyles,
  Icons,
  FieldStyles,
  OptionStyles,
  SelectStyles,
} from "../globals/styles.js";

export interface ContextStyles {
  /** Set to true to replace the default styles  @default false */
  replace?: boolean;
  /** Styles for the field component */
  field?: FieldStyles;
  /** Styles for the file component */
  file?: FileStyles;
  /** Styles for the select component */
  select?: SelectStyles;
  /** Styles for the option component */
  option?: OptionStyles;
  /** Component icons paths */
  icons?: Icons | null;
  /** Styles for the errors component */
  errors?: ErrorsStyles;
}
