import type { ContextStyles } from "../globals/contexts.js";

export interface FormStoreConfig<T> {
  fields: T;
  styles?: ContextStyles;
}

export interface ActionConfig {
  title?: string;
  message?: string;
  type?: "info" | "warning" | "success";
}

export type SubmitAction<T> = (values: T) => Promise<void>;

export type Submit = (event: SubmitEvent) => Promise<void>;

export interface SubmitOptions {
  error?(error: unknown): void;
  finish?: VoidFunction;
  context?: string;
  success?: Success;
}

interface Success {
  title: string;
  message: string;
}

export interface FieldsErrorsConfig {
  error: unknown;
  handle?: (error: unknown) => void;
}
