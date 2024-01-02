import type { SigninValues } from "$lib/logic/typing/schemas/auth.js";
import type { GlobalFormProps, TextsProp } from "$lib/logic/typing/globals/proptypes.js";

export type SigninFields = keyof SigninValues;

export interface Props extends GlobalFormProps {
  submit(values: SigninValues): Promise<void>;
  texts: TextsProp<SigninFields>;
  remember?: boolean;
}
