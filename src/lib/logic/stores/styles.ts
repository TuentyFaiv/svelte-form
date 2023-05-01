import { setContext } from "svelte";
import { readable } from "svelte/store";

import type { StoreStyles } from "../typing/stores/form.js";

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