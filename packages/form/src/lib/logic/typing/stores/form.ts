import type { Writable } from "svelte/store";
import type { ContextStyles } from "../globals/contexts.js";
import type { UserEvent } from "../globals/types.js";
import type { Errors } from "../utils/errors.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fields = Record<string, any>;

export type Schema = RegExp | "string" | "number" | "boolean" | "date" | "file";
export type FieldPropSchema<T> = {
  required ?: boolean;
  type: T;
  min ?: number;
  max ?: number;
};

export type ArraySchema = FieldPropSchema<"array"> & {
  item: Schema | FieldPropSchema<Schema> | ArraySchema | FieldsSchema;
};

export type FieldsSchema = {
  [key: string]: Schema | FieldPropSchema<Schema> | ArraySchema | FieldsSchema;
};

export type DeepSchema = ArraySchema | FieldPropSchema<Schema> | FieldsSchema;

export abstract class Adapter<T> {
  abstract initial(): {
    fields: T;
    errors: Errors<T>;
  };
  abstract validate<D = T>(data: D): Promise<void>;
  abstract field(field: keyof T, value: T[keyof T], errors: Writable<Errors<T>>): Promise<void>;
  abstract errors(
    error: unknown,
    errors: Writable<Errors<T>>,
    handle?: (error: unknown) => (void | Promise<void>)
  ): Promise<void>;
}

export interface FaivFormConfig<F, T extends FieldsSchema | Adapter<F>> {
  fields: T;
  styles?: ContextStyles;
  context?: string;
}

export type Submit = (event: UserEvent<HTMLFormElement, SubmitEvent>) => Promise<void>;
export type SubmitAction<T> = (values: T) => (Promise<void> | void);

export interface SubmitConfig<T extends Fields> {
  error?(error: unknown): void;
  finish?: VoidFunction;
  reset?: boolean;
  initial?: T;
}

export interface SetErrorsConfig {
  error: unknown;
  handle?: (error: unknown) => (void | Promise<void>);
}
