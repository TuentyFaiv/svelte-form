export { formStore, setConfig } from "./logic/stores/index.js";
export { fieldsSignin, fieldsSignup, fieldsContact } from "./logic/schemas/index.js";
export { Field, Select, Option, File, Errors } from "./ui/components/index.js";
export {
  SigninForm,
  SignupForm,
  ContactForm
} from "./ui/containers/index.js";
export { FormError } from "./logic/utils/errors.js";

export type { ContextStyles, ContextForm } from "./logic/typing/globals/contexts.js";
export type {
  SharedFormStyles,
  CssVars,
  ErrorsStyles,
  Icons,
  FileStyles,
  FieldStyles,
  OptionStyles,
  SelectStyles,
} from "./logic/typing/globals/styles.js";
export type { FormStoreConfig } from "./logic/typing/stores/form.js";
export type { Config } from "./logic/typing/stores/config.js";
export type { SelectOption } from "./logic/typing/globals/interfaces.js";
export type { TextsProp } from "./logic/typing/globals/proptypes.js";
export type { SigninValues, SignupValues } from "./logic/typing/schemas/auth.js";
export type { ContactValues } from "./logic/typing/schemas/contact.js";
