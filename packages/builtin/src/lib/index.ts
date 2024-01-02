export { setConfig, useGlobalFormStyles } from "./logic/stores/index.js";
export { getTexts } from "./logic/utils/objects.js";
export { fieldsSignin, fieldsSignup, fieldsContact } from "./logic/schemas/index.js";
export {
  SigninForm,
  SignupForm,
  ContactForm,
} from "./ui/containers/index.js";
export { REGEX_NUMBERS, REGEX_PASSWORD, REGEX_PHONE, REGEX_PHONE_CODE } from "./logic/utils/regex.js";

export type { ConfigForm } from "./logic/typing/store/config.js";
export type { FieldInputForm } from "./logic/typing/globals/interfaces.js";
export type { FormStyles, GlobalFormProps, TextsProp } from "./logic/typing/globals/proptypes.js";
export type { SigninValues, SignupValues } from "./logic/typing/schemas/auth.js";
export type { ContactValues } from "./logic/typing/schemas/contact.js";
