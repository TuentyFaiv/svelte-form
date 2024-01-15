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

type InferUnique<T extends Schema, R extends undefined | boolean> = T extends "string" | RegExp
  ? R extends undefined | false ? string | undefined | null : string
  : T extends "number"
    ? R extends undefined | false ? number | undefined | null : number
    : T extends "boolean"
      ? R extends undefined | false ? boolean | undefined | null : boolean
      : T extends "date"
        ? R extends undefined | false ? Date | undefined | null : Date
        : T extends "file"
          ? R extends undefined | false ? File | Blob | undefined | null : File | Blob
          : never;

type InferArray<T extends Schema | DeepSchema> = T extends Schema ? never : T extends ArraySchema
  ? T["item"] extends Schema
    ? T extends { required: infer R }
      ? R extends true
        ? InferUnique<T["item"], true>[]
        : InferUnique<T["item"], true>[] | null | undefined
      : InferUnique<T["item"], true>[] | null | undefined
    : T["item"] extends ArraySchema
      ? T extends { required: infer R }
        ? R extends true
          ? InferArray<T["item"]>[]
          : InferArray<T["item"]>[] | null | undefined
        : InferArray<T["item"]>[] | null | undefined
      : T["item"] extends FieldPropSchema<infer P>
        ? P extends Schema
          ? T extends { required: infer R }
            ? R extends true
              ? InferUnique<P, true>[]
              : InferUnique<P, true>[] | null | undefined
            : InferUnique<P, true>[] | null | undefined
          : never
        : T["item"] extends FieldsSchema
          ? T extends { required: infer R }
            ? R extends true
              ? Infer<T["item"]>[]
              : Infer<T["item"]>[] | null | undefined
            : Infer<T["item"]>[] | null | undefined
          : never
  : never;

export type Infer<T extends FieldsSchema | Fields> = T extends object ? {
  [K in keyof T]: T[K] extends undefined | null ? never : T[K] extends Schema
    ? InferUnique<T[K], undefined>
    : T[K] extends ArraySchema
      ? InferArray<T[K]>
      : T[K] extends FieldPropSchema<infer P>
        ? P extends Schema ? InferUnique<P, T[K]["required"]> : never
        : T[K] extends FieldsSchema ? Infer<T[K]> : never;
} : T;

// const fields = {
//   // name: /^[a-zA-Z]+$/,
//   // message: "string",
//   accept: "boolean",
//   cover: "file",
//   asda: {
//     type: "number",
//     min: 24,
//     max: 10,
//     required: true,
//   },
//   other: {
//     type: /asda/,
//     min: 5,
//     required: true,
//   },
//   // some: {
//   //   errors: {
//   //     first: "string",
//   //   },
//   // },
//   // avatars: {
//   //   type: "array",
//   //   item: {
//   //     type: "string",
//   //     min: 4,
//   //   },
//   // },
//   users: {
//     type: "array",
//     required: true,
//     item: {
//       email: {
//         type: "string",
//         required: true,
//       },
//       username: {
//         type: "string",
//         required: true,
//       },
//       avatar: "file",
//       active: "boolean",
//       age: "number",
//       details: "string",
//     },
//   },
//   // deepArrays: {
//   //   type: "array",
//   //   item: {
//   //     type: "array",
//   //     item: {
//   //       type: "array",
//   //       item: {
//   //         type: "array",
//   //         item: {
//   //           type: "number",
//   //           required: true,
//   //         },
//   //       },
//   //     },
//   //   },
//   // },
//   // dates: {
//   //   type: "array",
//   //   item: {
//   //     type: "array",
//   //     item: {
//   //       type: "date",
//   //       required: true,
//   //     },
//   //   },
//   // },
// } satisfies FieldsSchema;

// type Result = Infer<typeof fields>;
