export { faivform, useForm, setConfig } from "./logic/stores/index.js";
export { Field, Select, Option, File, Errors } from "./ui/components/index.js";
export { FormError, SchemaError, SchemaErrorList } from "./logic/utils/errors.js";

// Global types
export type {
  FieldStyles,
  SelectStyles,
  OptionStyles,
  FileStyles,
  ErrorsStyles,
  Icons,
} from "./logic/typing/globals/styles.js";
export type { SelectOption, OptionItem } from "./logic/typing/globals/interfaces.js";
export type { SharedUIProps, GeneralFieldProps } from "./logic/typing/globals/proptypes.js";

// Styles types
export type {
  Config,
  ContextStyles,
  FaivCSSVars,
  FaivFormTheme,
} from "./logic/typing/stores/styles.js";

// Faivform types
export type {
  // Internal schemas,
  Schema,
  FieldProps as FieldPropSchema,
  ArraySchema,
  FieldsSchema,
  // Faivform config
  FaivFormConfig,
  FaivFormStore,
  Adapter,
  Context,
  ContextForm,
  // Submit config
  Submit,
  SubmitAction,
  SubmitConfig,
} from "./logic/typing/stores/form.js";
