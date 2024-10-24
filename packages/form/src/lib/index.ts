export { faivform, useForm, setConfig } from "./logic/stores/index.js";
export { Field, Select, Option, File, Errors } from "./components/index.js";
export { FormError, SchemaError, SchemaErrorList } from "./logic/utils/errors.js";
export { Adapter } from "./logic/typing/stores/form.js";

// Global types
export type {
  FieldStyles,
  SelectStyles,
  OptionStyles,
  FileStyles,
  ErrorsStyles,
} from "./logic/typing/globals/styles.js";
export type { SelectOption, OptionItem } from "./logic/typing/globals/interfaces.js";
export type { SharedUIProps, GeneralFieldProps } from "./logic/typing/globals/proptypes.js";

// Styles types
export type { ContextStyles } from "./logic/typing/stores/styles.js";

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
  ContextForm,
  // Submit config
  Submit,
  SubmitAction,
  SubmitConfig,
} from "./logic/typing/stores/form.js";

// Faivform utils types
export type {
  Errors as DataErrors,
} from "./logic/typing/utils/errors.js";
