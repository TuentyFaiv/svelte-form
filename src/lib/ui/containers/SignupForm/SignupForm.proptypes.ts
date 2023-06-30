import type { SignupValues } from "$lib/logic/typing/schemas/auth.js";
import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
import type { GlobalFormProps, TextsProp } from "$lib/logic/typing/globals/proptypes.js";
import type { SubmitOptions } from "$lib/logic/typing/stores/form.js";

export type SignupFields = keyof SignupValues;

export interface Props extends GlobalFormProps {
  options: SelectOption[];
  code: "bycountry" | "byphone";
  confirm: boolean;
  success: SubmitOptions["success"];
  submit(values: SignupValues): Promise<void>;
  texts: TextsProp<SignupFields>;
}
