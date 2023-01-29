import type { Writable } from "svelte/store";
import type { ObjStrCustom } from "./globals.types";

export type Errors = ObjStrCustom<string | null>;

export interface ConfigShowErrors<T> {
  error: unknown;
  errors: T;
  ns?: string;
  handle?(error: unknown): void;
}

export type ConfigErrors<T> = ConfigShowErrors<Writable<T>>;

export interface ConfigError<T> extends Omit<ConfigErrors<T>, "error"> {
  error?: unknown;
  key: string;
}
