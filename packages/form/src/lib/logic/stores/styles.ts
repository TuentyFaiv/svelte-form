import { setContext } from "svelte";
import { readable } from "svelte/store";

import type { ContextStyles } from "../typing/stores/styles.js";

export function setConfig(fields: ContextStyles = {}) {
  const {
    field = {},
    option = {},
    select = {},
    file = {},
    errors = {},
    icons = null,
    replace = false,
  } = fields;
  const styles = readable<ContextStyles>({
    replace,
    field,
    option,
    select,
    file,
    errors,
    icons,
  });

  setContext("faivform-styles", styles);
}
