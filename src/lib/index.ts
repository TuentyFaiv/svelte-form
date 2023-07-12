export { faivform, useForm, setConfig } from "./logic/stores/index.js";
export { Field, Select, Option, File, Errors } from "./ui/components/index.js";
export { FormError } from "./logic/utils/errors.js";

export type { Config } from "./logic/typing/stores/config.js";
export type { ContextStyles, ContextForm } from "./logic/typing/globals/contexts.js";
export type { SelectOption } from "./logic/typing/globals/interfaces.js";
export type { SharedUIProps, GeneralInputProps, GeneralFieldProps } from "./logic/typing/globals/proptypes.js";
export type { FormStoreConfig, SubmitOptions } from "./logic/typing/stores/form.js";
export type {
  CssVars,
  ErrorsStyles,
  Icons,
  FileStyles,
  FieldStyles,
  OptionStyles,
  SelectStyles,
} from "./logic/typing/globals/styles.js";
