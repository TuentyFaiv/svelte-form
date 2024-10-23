import { hasArray } from "./parse.js";

export function isSelected(data: unknown, value: string) {
  return hasArray<string>(data).some((item) => item === value);
}
