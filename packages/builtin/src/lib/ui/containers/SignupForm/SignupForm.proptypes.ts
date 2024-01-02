import type { SelectOption } from "@tuentyfaiv/svelte-form";
import type { SignupValues } from "$lib/logic/typing/schemas/auth.js";
import type { GlobalFormProps, TextsProp } from "$lib/logic/typing/globals/proptypes.js";

export type SignupFields = keyof SignupValues;

export interface Props extends GlobalFormProps {
  options: SelectOption[];
  code: "bycountry" | "byphone";
  confirm: boolean;
  submit(values: SignupValues): Promise<void>;
  texts: TextsProp<SignupFields>;
}
