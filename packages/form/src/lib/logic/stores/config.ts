import { setContext } from "svelte";
import { readable } from "svelte/store";
import { FormVarStyles } from "./styles.js";

import type { Config } from "../typing/stores/config.js";

function setStyles(config: Config["fields"] = {}) {
  const {
    field = {},
    option = {},
    select = {},
    file = {},
    errors = {},
    icons = null,
    replace = false,
  } = config;
  const styles = readable<Config["fields"]>({
    replace,
    field,
    option,
    select,
    file,
    errors,
    icons,
  });

  setContext("styles", styles);
}

function setStylesVariables(config: Config["vars"] = {}) {
  FormVarStyles.create(config, true);
}

export function setConfig({ fields, vars }: Config = {}) {
  setStyles(fields);
  setStylesVariables(vars);
}
