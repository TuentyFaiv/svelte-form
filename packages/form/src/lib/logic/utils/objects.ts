import { hasArray } from "./parse";

export function generateDatas(datas: Record<string, string | number | boolean> = {}) {
  return Object.keys(datas).reduce(
    (acc, key) => ({
      ...acc,
      [`data-${key}`]: datas[key],
    }),
    {},
  );
}

export function isSelected(data: unknown, value: string) {
  return hasArray<string>(data).some((item) => item === value);
}
