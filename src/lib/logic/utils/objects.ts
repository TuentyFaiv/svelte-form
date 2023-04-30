import type { ObjStrCommon } from "../typing/globals.types.js";

export function generateDatas(datas: ObjStrCommon) {
  return Object.keys(datas).reduce(
    (acc, key) => ({
      ...acc,
      [`data-${key}`]: datas[key]
    }),
    {}
  );
}
