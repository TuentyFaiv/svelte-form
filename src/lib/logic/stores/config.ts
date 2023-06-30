import { setContext } from "svelte";
import { readable } from "svelte/store";
import type { Config } from "../typing/stores/config.js";
import { injectGlobal } from "@emotion/css";

export function setStyles(config: Config["fields"] = {}) {
  const {
    input = {},
    option = {},
    select = {},
    fileinput = {},
    errors = {},
    icons = null
  } = config;
  const styles = readable<Config["fields"]>({
    input,
    option,
    select,
    fileinput,
    errors,
    icons
  });

  setContext("styles", styles);
}

export function setFormStyles(config: Config["form"] = {}) {
  const { box, container, submit } = config;

  const styles = readable<Config["form"]>({
    box,
    container,
    submit
  });

  setContext("formStyles", styles);
}

export function setStylesVariables(config: Config["vars"] = {}) {
  if (Object.keys(config).length === 0) return;
  injectGlobal`
    :root {
      --s-form-primary: ${config.primary ?? ""};
      --s-form-secondary: ${config.secondary ?? ""};
      --s-form-accent: ${config.accent ?? ""};
      --s-form-error: ${config.error ?? ""};
      --s-form-warning: ${config.warning ?? ""};
      --s-form-success: ${config.success ?? ""};
      --s-form-shadow: ${config.shadow ?? ""};
      --s-form-border: ${config.border ?? ""};
    }
  `;
}

export function setConfig({ fields, form, vars }: Config) {
  setStyles(fields);
  setFormStyles(form);
  setStylesVariables(vars);
}