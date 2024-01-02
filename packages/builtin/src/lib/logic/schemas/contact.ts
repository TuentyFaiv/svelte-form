import { boolean, string } from "yup";
import { REGEX_PHONE, REGEX_PHONE_CODE } from "../utils/regex.js";

export const fieldsContact = {
  email: string().email("required-email").required("required"),
  name: string().required("required"),
  message: string().optional(),
  phone: string().matches(REGEX_PHONE, "only-number").required("required"),
  phoneCode: string().matches(REGEX_PHONE_CODE, "invalid-code").required("required"),
  terms: boolean().oneOf([true], "required-terms").required("required"),
};
