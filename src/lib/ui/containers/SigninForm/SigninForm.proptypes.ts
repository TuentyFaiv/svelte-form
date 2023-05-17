import type { SigninValues } from "$lib/logic/typing/schemas/auth.js";
import type { GlobalFormProps, Text } from "$lib/logic/typing/globals/proptypes.js";
import type { SubmitOptions } from "$lib/logic/typing/stores/form.js";

export interface Props extends GlobalFormProps {
  success: SubmitOptions["success"];
  submit(values: SigninValues): Promise<void>;
  texts: {
    email: Text;
    password: Text;
  }
}
