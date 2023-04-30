import { string } from "yup";
import { REGEX_PASSWORD, REGEX_PHONE, REGEX_PHONE_CODE } from "../utils/regex.js";

export const fieldsSignin = {
  email: string().email("required-email").required("required"),
  password: string().matches(REGEX_PASSWORD, "required-pass").required("required")
};

export const fieldsSignup = {
  ...fieldsSignin,
  firstName: string().required("required"),
  lastName: string().required("required"),
  country: string().required("required"),
  phone: string().matches(REGEX_PHONE, "only-number").required("required"),
  phoneCode: string().matches(REGEX_PHONE_CODE, "invalid-code").required("required"),
  confirmPassword: fieldsSignin.password
};
