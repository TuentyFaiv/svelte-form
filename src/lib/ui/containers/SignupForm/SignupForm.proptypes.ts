import type { SignupValues } from "$lib/logic/typing/schemas/auth.js";
import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
import type { GlobalFormProps, Text } from "$lib/logic/typing/globals/proptypes.js";
import type { SubmitOptions } from "$lib/logic/typing/stores/form.js";

export interface Props extends GlobalFormProps {
  options: SelectOption[];
  code: "bycountry" | "byphone";
  confirm: boolean;
  success: SubmitOptions["success"];
  submit(values: SignupValues): Promise<void>;
  texts: {
    firstname: Text;
    lastname: Text;
    country: Text;
    phone: Text;
    email: Text;
    phonecode: Text;
    password: Text;
    confirmPassword?: Text;
  }
}
