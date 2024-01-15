import type {
  Schema,
  ArraySchema,
  FieldPropSchema,
  FieldsSchema,
  DeepSchema,
  Fields,
} from "../stores/form.js";
import type { SchemaErrorConfig } from "./errors.js";

export interface TypeErrorConfig extends Omit<SchemaErrorConfig, "reason" | "message"> {
  type: string;
}

export type InvalidErrorConfig = Omit<SchemaErrorConfig, "reason" | "message">;

export type RequiredErrorConfig = InvalidErrorConfig;

export interface RangeErrordConfig extends Omit<SchemaErrorConfig, "reason" | "message"> {
  label: "min" | "max";
  range?: number | Date;
  value: unknown;
}

export type ParsedPrimitive = string | number | boolean | Date | undefined | null | File | Blob;
export type ParsedArray = ParsedPrimitive[] | Parsed[] | ParsedArray[] | null | undefined;

export type Parsed = {
  [key: string]: ParsedPrimitive | ParsedArray | Parsed;
};

type InferUnique<T extends Schema> = T extends "string" | RegExp
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : T extends "date"
        ? Date
        : T extends "file"
          ? File | Blob
          : never;

type InferArray<
T extends Schema | DeepSchema,
> = T extends Schema ? InferUnique<T>[] : T extends ArraySchema
  ? T["item"] extends Schema
    ? InferUnique<T["item"]>[]
    : T["item"] extends ArraySchema
      ? InferArray<T["item"]>[]
      : T["item"] extends FieldPropSchema<infer P>
        ? P extends Schema ? InferUnique<P>[] : never
        : T["item"] extends FieldsSchema ? Infer<T["item"]>[] : never
  : T extends FieldPropSchema<infer P>
    ? P extends Schema ? InferUnique<P>[] : never
    : T extends FieldsSchema ? Infer<T>[] : never;

export type Infer<T extends FieldsSchema | Fields> = T extends object ? {
  [K in keyof T]: T[K] extends undefined | null ? never : T[K] extends Schema
    ? InferUnique<T[K]>
    : T[K] extends ArraySchema
      ? InferArray<T[K]>
      : T[K] extends FieldPropSchema<infer P>
        ? P extends Schema ? InferUnique<P> : never
        : T[K] extends FieldsSchema ? Infer<T[K]> : never;
} : T;

const fields = {
  name: /^[a-zA-Z]+$/,
  message: "string",
  accept: "boolean",
  cover: "file",
  some: {
    errors: {
      first: "string",
    },
  },
  asda: {
    type: "number",
    min: 24,
    max: 10,
    required: true,
  },
  other: {
    type: /asda/,
    min: 5,
    required: true,
  },
  avatars: {
    type: "array",
    item: {
      type: "string",
      min: 4,
    },
  },
  users: {
    type: "array",
    item: {
      email: {
        type: "string",
        required: true,
      },
      username: {
        type: "string",
        required: true,
      },
      avatar: "file",
      active: "boolean",
      age: "number",
      details: "string",
    },
  },
  deepArrays: {
    type: "array",
    item: {
      type: "array",
      item: {
        type: "array",
        item: {
          type: "array",
          item: {
            type: "number",
            required: true,
          },
        },
      },
    },
  },
  dates: {
    type: "array",
    item: {
      type: "array",
      item: {
        type: "date",
        required: true,
      },
    },
  },
} satisfies FieldsSchema;

type Result = Infer<typeof fields>;
