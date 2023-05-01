import { object } from "yup";
import { fieldsSignin, fieldsSignup } from "../../schemas/index.js";

// eslint-disable-next-line import/order
import type { InferType } from "yup";

const schemaSignin = object(fieldsSignin);
const schemaSignup = object(fieldsSignup);

export type SigninValues = InferType<typeof schemaSignin>;
export type SignupValues = InferType<typeof schemaSignup>;
