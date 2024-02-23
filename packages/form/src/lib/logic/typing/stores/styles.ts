import type {
  ErrorsStyles,
  FileStyles,
  Icons,
  FieldStyles,
  OptionStyles,
  SelectStyles,
} from "../globals/styles.js";

export interface Config {
  fields?: ContextStyles;
  light?: FaivFormTheme;
  dark?: FaivFormTheme;
  onLight?: FaivCSSVars;
  onDark?: FaivCSSVars;
}

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

type ThemeColors = "primary" | "secondary" | "accent" | "error" | "warning" | "success" | "placeholder";
type ThemePalette = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FaivFormThemePalette = {
  [key in ThemePalette]?: string;
};
export type FaivFormTheme = {
  font?: string;
  space?: string;
  radius?: string;
  white?: string;
  black?: string;
} & {
  [key in ThemeColors]?: FaivFormThemePalette;
};

export interface FaivColorVars {
  color?: string;
  opacity?: string;
  text?: string;
  "text-opacity"?: string;
  font?: string;
}
export interface FaivShadowVars {
  base?: string;
  size?: string;
  color?: string;
  opacity?: string;
}
export interface FaivBorderVars {
  base?: string;
  width?: string;
  style?: string;
  color?: string;
  opacity?: string;
}
export type FaivCSSVars = {
  [key in ThemeColors]?: FaivColorVars;
} & {
  shadow?: FaivShadowVars;
  border?: FaivBorderVars;
};
