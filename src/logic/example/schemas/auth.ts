import { string } from "yup";
import { formStore } from "@stores";

import type { Fields } from "@typing/stores.form";

const fieldsSignin: Fields = {
  email: string().email("required-email").required("required"),
  password: string().required("required")
};

export const formSignin = formStore(fieldsSignin);
