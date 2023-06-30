import type { ContextStyles } from "../globals/contexts.js";
import type { CssVars, SharedFormStyles } from "../globals/styles.js";

export interface Config {
  fields?: ContextStyles;
  form?: SharedFormStyles;
  vars?: CssVars;
}
