import type { Writable } from "svelte/store";

export function toggle(store: Writable<boolean>, custom: unknown) {
  if (typeof custom === "boolean") {
    store.set(custom);
  } else {
    store.update((prev) => !prev);
  }
}

export function transformOnOff(value: unknown) {
  if (typeof value === "boolean") return value;

  const isOn = value === "on";
  const isBoolean = (isOn) || (value === "off");

  return isBoolean ? isOn : value;
}
