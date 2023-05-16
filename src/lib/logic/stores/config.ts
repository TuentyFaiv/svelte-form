import { getContext, setContext } from "svelte";
import { readable, writable } from "svelte/store";

import type { StoreStyles } from "../typing/stores/form.js";
import type { FormStyles } from "../typing/globals/proptypes.js";
import type { Config, ContextConfig } from "../typing/stores/config.js";

export function setStyles(config: StoreStyles = {}) {
  const {
    input = {},
    option = {},
    select = {},
    fileinput = {},
    errors = {},
    icons = null
  } = config;
  const styles = readable<StoreStyles>({
    input,
    option,
    select,
    fileinput,
    errors,
    icons
  });

  setContext("styles", styles);
}

export function setFormStyles(config: FormStyles = {}) {
  const { box, container, submit } = config;

  const styles = readable<FormStyles>({
    box,
    container,
    submit
  });

  setContext("formStyles", styles);
}

export function setConfig({ fields, form, ...config }: Config) {
  setStyles(fields);
  setFormStyles(form);
  if (Object.keys(config).length > 0) {
    setContext<ContextConfig>("tfformconfig", config as ContextConfig);
  }
}

export function getConfig(): ContextConfig {
  const fallbackI18n = writable({
    t: (msg: string) => msg
  });
  return getContext<ContextConfig>("tfformconfig") || { i18n: fallbackI18n };
}