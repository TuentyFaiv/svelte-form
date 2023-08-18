import type { GetStyleConfig } from "../typing/utils/styles.js";

export function getStyle({ replace, style, external }: GetStyleConfig) {
  if (replace) {
    return external ?? style;
  }

  return external ? `${style} ${external ?? ""}` : style;
}
