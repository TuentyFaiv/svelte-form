import type { ContextStyles } from "../globals/contexts.js";

export interface FormStoreConfig<T> {
  fields: T;
  styles?: ContextStyles;
}

export type SubmitAction<T> = (values: T) => Promise<void>;

export type Submit = (event: SubmitEvent) => Promise<void>;

export interface SubmitOptions {
  error?(error: unknown): void;
  finish?: VoidFunction;
  context?: string;
  reset?: boolean;
}

export interface FieldsErrorsConfig {
  error: unknown;
  handle?: (error: unknown) => void;
}
