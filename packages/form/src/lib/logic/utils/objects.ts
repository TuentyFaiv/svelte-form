export function generateDatas(datas: Record<string, string | number | boolean>) {
  return Object.keys(datas).reduce(
    (acc, key) => ({
      ...acc,
      [`data-${key}`]: datas[key],
    }),
    {},
  );
}
