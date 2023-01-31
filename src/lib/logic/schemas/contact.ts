import { string } from "yup";
import { REGEX_PHONE, REGEX_PHONE_CODE } from "../utils/regex";

import type { Fields } from "../typing/stores.form";

export const fieldsContact: Fields = {
  email: string().email("required-email").required("required"),
  firstName: string().required("required"),
  message: string(),
  phone: string().matches(REGEX_PHONE, "only-number").required("required"),
  phoneCode: string().matches(REGEX_PHONE_CODE, "invalid-code").required("required")
};
