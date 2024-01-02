import { getContext, setContext } from "svelte";
import { readable } from "svelte/store";
import { setConfig as setFieldsConfig } from "@tuentyfaiv/svelte-form";

import type { Readable } from "svelte/motion";
import type { ConfigForm } from "../typing/store/config.js";

export function setFormStyles(config: ConfigForm["form"] = {}) {
  const { box, container, submit } = config;

  const styles = readable<ConfigForm["form"]>({
    box,
    container,
    submit,
  });

  setContext("formStyles", styles);
}

export function setConfig({ fields, form, vars }: ConfigForm = {}) {
  setFieldsConfig({ fields, vars });
  setFormStyles(form);
}

export function useGlobalFormStyles() {
  return getContext<Readable<ConfigForm["form"]>>("formStyles");
}
