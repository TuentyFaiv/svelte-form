import type { AnySchema, ISchema, Reference } from "yup";

export interface YupAdapterConfig<T> {
  schema: T;
  resolveDeep(three: ISchema<AnySchema> | Reference): null | undefined;
}
