import type { Config } from "@tuentyfaiv/svelte-form";
import type { SharedFormStyles } from "../globals/styles.js";

export interface ConfigForm extends Config {
  form?: SharedFormStyles;
}
