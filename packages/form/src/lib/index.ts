export { faivform, useForm, setConfig } from "./logic/stores/index.js";
export { Field, Select, Option, File, Errors } from "./ui/components/index.js";
export { FormError, SchemaError, SchemaErrorList } from "./logic/utils/errors.js";

// context types
export type { Config } from "./logic/typing/stores/config.js";
export type { ContextStyles, ContextForm } from "./logic/typing/globals/contexts.js";
export type { SelectOption, OptionItem } from "./logic/typing/globals/interfaces.js";
export type { SharedUIProps, GeneralInputProps, GeneralFieldProps } from "./logic/typing/globals/proptypes.js";

// faivform types
export type {
  // Internal schemas,
  Schema,
  FieldPropSchema,
  ArraySchema,
  FieldsSchema,
  // Faivform config
  FaivFormConfig,
  Adapter,
  // Submit config
  Submit,
  SubmitAction,
  SubmitConfig,
} from "./logic/typing/stores/form.js";

// styles types
export type {
  CssVars,
  ErrorsStyles,
  Icons,
  FileStyles,
  FieldStyles,
  OptionStyles,
  SelectStyles,
} from "./logic/typing/globals/styles.js";
