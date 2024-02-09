import type { ZodTypeAny } from "zod";

export interface ZodAdapterConfig<T> {
  schema: T;
  resolveDeep: (three: ZodTypeAny) => null | undefined;
}
