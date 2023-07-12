import { setContext } from "svelte";
import { readable } from "svelte/store";
import { FormVarStyles } from "./styles.js";

import type { Config } from "../typing/stores/config.js";

export function setStyles(config: Config["fields"] = {}) {
  const {
    field = {},
    option = {},
    select = {},
    file = {},
    errors = {},
    icons = null,
  } = config;
  const styles = readable<Config["fields"]>({
    field,
    option,
    select,
    file,
    errors,
    icons,
  });

  setContext("styles", styles);
}

export function setFormStyles(config: Config["form"] = {}) {
  const { box, container, submit } = config;

  const styles = readable<Config["form"]>({
    box,
    container,
    submit,
  });

  setContext("formStyles", styles);
}

export function setStylesVariables(config: Config["vars"] = {}) {
  FormVarStyles.create(config, true);
}

export function setConfig({ fields, form, vars }: Config = {}) {
  setStyles(fields);
  setFormStyles(form);
  setStylesVariables(vars);
}
