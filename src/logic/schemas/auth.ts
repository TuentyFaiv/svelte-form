import { string, mixed } from "yup";
import { formStore } from "@stores";

import type { Fields } from "@typing/stores.form";

const fieldsSignin: Fields = {
  email: string().email("required-email").required("required"),
  password: string().required("required"),
  country: string(),
  avatar: mixed()
};

export const formSignin = formStore(fieldsSignin);
