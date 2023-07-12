import type { ContextStyles } from "../globals/contexts.js";
import type { CssVars } from "../globals/styles.js";

export interface Config {
  fields?: ContextStyles;
  // form?: SharedFormStyles;
  vars?: CssVars;
}
