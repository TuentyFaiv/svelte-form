import type { Icons } from "../globals/styles.js";

export interface GetStyleConfig {
  replace?: boolean;
  style: string;
  external?: string;
}

export interface GetStylesConfig<T> {
  replace?: boolean;
  internals: T;
  externals?: T;
  icons?: Icons;
}

export type StylesToUse<T> = Required<Omit<T, keyof Icons>>;

export type GetStylesResult<T> = StylesToUse<T> & Icons;
