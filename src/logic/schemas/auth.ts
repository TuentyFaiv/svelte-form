// import { string, mixed } from "yup";
import { formStore } from "$lib/logic/stores";
import { fieldsSignin } from "$lib/logic/schemas/auth";

// import type { Fields } from "@typing/stores.form";

// const fieldsSignin: Fields = {
//   email: string().email("required-email").required("required"),
//   password: string().required("required"),
//   country: string().required("required"),
//   avatar: mixed().required("required"),
//   method: string().required("required")
// };

export const formSignin = formStore({ fields: fieldsSignin });
// export const formSignin = formStore({ fields: fieldsSignin });
