import type { Data } from "./stores.form";

export interface ContactValues extends Data {
  email: string;
  name: string;
  message?: string;
  phone: string;
  phoneCode: string;
}
