import type { Writable } from "svelte/store";

export type Errors = Record<string, string | null>;

export interface ConfigShowErrors<T> {
  error: unknown;
  errors: T;
  ns?: string;
}

export interface ConfigErrors<T> extends ConfigShowErrors<Writable<T>> {
  handle?(error: unknown): void;
}

export interface ConfigError<K, T> extends Omit<ConfigErrors<T>, "error"> {
  error?: unknown;
  key: K;
}
