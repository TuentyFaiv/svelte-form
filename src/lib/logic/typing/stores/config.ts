import type { Writable } from "svelte/store";
import type { FormStyles } from "../globals/proptypes.js";
import type { Message, StoreStyles } from "./form.js";

export interface Config {
  fields?: StoreStyles;
  form?: FormStyles;
  i18n?: Writable<Record<any, any>>;
}

export interface ContextConfig {
  i18n?: Writable<{ t: Message }>;
}