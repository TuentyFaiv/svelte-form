import type { GeneralInputProps } from "@tuentyfaiv/svelte-form";

export interface FieldInputForm<TName extends string, TExtraTypes extends string = GeneralInputProps["type"]> {
  readonly name: TName;
  readonly type: GeneralInputProps["type"] | TExtraTypes;
}
