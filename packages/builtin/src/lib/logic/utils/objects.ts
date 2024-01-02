import type { FieldInputForm } from "../typing/globals/interfaces.js";
import type { TextPropExplicit, TextsProp } from "../typing/globals/proptypes.js";

export function getTexts<T extends string>(texts: TextsProp<T>) {
  return function formatField<E extends string>(field: FieldInputForm<T, E>) {
    const textField = texts[field.name];
    const isShared = typeof textField === "string";
    const isExplicit: TextPropExplicit = typeof textField === "undefined"
      ? ({
        label: `${field.name.charAt(0).toUpperCase()}${field.name.slice(1)}`,
      })
      : (textField as TextPropExplicit);
    return {
      ...field,
      label: isShared ? textField : isExplicit.label,
      placeholder: isShared ? textField : isExplicit.placeholder,
    };
  };
}
