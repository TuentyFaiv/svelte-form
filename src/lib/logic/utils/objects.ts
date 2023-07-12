// import type { FieldInputForm } from "../typing/globals/interfaces.js";
// import type { TextPropExplicit, TextsProp } from "../typing/globals/proptypes.js";
import type { ObjStrCommon } from "../typing/globals/types.js";

export function generateDatas(datas: ObjStrCommon) {
  return Object.keys(datas).reduce(
    (acc, key) => ({
      ...acc,
      [`data-${key}`]: datas[key],
    }),
    {},
  );
}

// export function getTexts<T extends string>(texts: TextsProp<T>) {
//   return function formatField<E extends string>(field: FieldInputForm<T, E>) {
//     const textField = texts[field.name];
//     const isShared = typeof textField === "string";

//     return {
//       ...field,
//       label: isShared ? textField : (textField as TextPropExplicit).label,
//       placeholder: isShared ? textField : (textField as TextPropExplicit).placeholder,
//     };
//   };
// }
