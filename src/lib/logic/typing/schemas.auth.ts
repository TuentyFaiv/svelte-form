import type { Data } from "./stores.form";

export interface SigninValues extends Data {
  email: string;
  password: string;
}

export interface SignupValues extends SigninValues {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  phoneCode: string;
  confirmPassword: string
}
