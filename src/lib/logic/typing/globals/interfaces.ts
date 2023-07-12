// import type { GeneralInputProps } from "./proptypes.js";

export interface SelectOption {
  key?: string;
  label: string;
  value: string;
  disabled?: boolean;
}

// export interface FieldInputForm<TName extends string, TExtraTypes extends string = "email"> {
//   readonly name: TName;
//   readonly type: GeneralInputProps["type"] | TExtraTypes;
// }
