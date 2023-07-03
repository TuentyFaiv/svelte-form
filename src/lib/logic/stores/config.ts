import { setContext } from "svelte";
import { readable } from "svelte/store";
import type { Config } from "../typing/stores/config.js";
import { injectGlobal } from "@emotion/css";

export function setStyles(config: Config["fields"] = {}) {
  const {
    field = {},
    option = {},
    select = {},
    file = {},
    errors = {},
    icons = null
  } = config;
  const styles = readable<Config["fields"]>({
    field,
    option,
    select,
    file,
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
  injectGlobal`
    :root {
      --s-form-primary: ${config.primary ?? "#CCCCCC"};
      --s-form-secondary: ${config.secondary ?? "#FFFFFF"};
      --s-form-accent: ${config.accent ?? "#000000"};
      --s-form-error: ${config.error ?? "#FF0000"};
      --s-form-warning: ${config.warning ?? "#FFA500"};
      --s-form-success: ${config.success ?? "#008000"};
      --s-form-shadow: ${config.shadow ?? "0 0 5px 0 rgba(0, 0, 0, 0.5)"};
      --s-form-border: ${config.border ?? "1px solid var(--s-form-primary)"};
      --s-form-text: ${config.text ?? "#000000"};
      --s-form-placeholder: ${config.placeholder ?? "#B8B2B2"};
      --s-form-text-error: ${config.texterror ?? "#FFFFFF"};
      --s-form-radius: ${config.radius ?? "4px"};
      --s-form-font: ${config.font ?? "system-ui, sans-serif"};
    }
  `;
}

export function setConfig({ fields, form, vars }: Config) {
  setStyles(fields);
  setFormStyles(form);
  setStylesVariables(vars);
}