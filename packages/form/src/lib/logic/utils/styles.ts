import type { Fields } from "../typing/stores/form.js";
import type {
  GetStyleConfig,
  GetStylesConfig,
  GetStylesResult,
  StylesToUse,
} from "../typing/utils/styles.js";

export function getStyles<T extends Fields>({
  replace,
  internals,
  externals,
  icons = {},
}: GetStylesConfig<T>): GetStylesResult<T> {
  const styles = Object.keys(internals).reduce((acc, key) => {
    if (replace) {
      return {
        ...acc,
        [key]: externals?.[key] ?? internals[key],
      };
    }

    return {
      ...acc,
      [key]: externals?.[key] ? `${internals[key]} ${externals[key]}` : internals[key],
    };
  }, {} as StylesToUse<T>);

  return { ...styles, ...icons };
}

export function getStyle({ replace, style, external }: GetStyleConfig) {
  if (replace) {
    return external ?? style;
  }

  return external ? `${style} ${external}` : style;
}
