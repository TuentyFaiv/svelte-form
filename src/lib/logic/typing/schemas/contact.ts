import { object } from "yup";
import { fieldsContact } from "../../schemas/index.js";

// eslint-disable-next-line import/order
import type { InferType } from "yup";

const schema = object(fieldsContact);

export type ContactValues = InferType<typeof schema>;
