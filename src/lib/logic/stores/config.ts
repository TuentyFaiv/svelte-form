import { setContext } from "svelte";
import { readable } from "svelte/store";

import type { StoreStyles } from "../typing/stores/form.js";
import type { FormStyles } from "../typing/globals/proptypes.js";
import type { Config } from "../typing/stores/config.js";

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

export function setConfig({ fields, form }: Config) {
  setStyles(fields);
  setFormStyles(form);
}