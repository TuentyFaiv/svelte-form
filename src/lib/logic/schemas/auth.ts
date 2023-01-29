import { string } from "yup";
import { REGEX_PASSWORD } from "../utils/regex";

import type { Fields } from "../typing/stores.form";

export const fieldsSignin: Fields = {
  email: string().email("required-email").required("required"),
  password: string().matches(REGEX_PASSWORD, "required-pass").required("required")
};
