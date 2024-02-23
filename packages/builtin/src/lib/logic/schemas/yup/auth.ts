import { boolean, object, string } from "yup";
import { REGEX_PASSWORD, REGEX_PHONE, REGEX_PHONE_CODE } from "$lib/logic/utils/regex.js";

export const loginSchema = object({
  email: string().email("required-email").required("required"),
  password: string().matches(REGEX_PASSWORD, "required-password").required("required"),
  remember: boolean(),
});

export const registerSchema = object({
  email: string().email("required-email").required("required"),
  password: string().matches(REGEX_PASSWORD, "required-password").required("required"),
  confirmPassword: string().matches(REGEX_PASSWORD, "required-password").required("required"),
  firstName: string().required("required"),
  lastName: string().required("required"),
  country: string().required("required"),
  phone: string().matches(REGEX_PHONE, "only-number").required("required"),
  phoneCode: string().matches(REGEX_PHONE_CODE, "invalid-code").required("required"),
  terms: boolean().oneOf([true], "required-terms").required("required"),
});
