import type { ContactValues } from "$lib/logic/typing/schemas/contact.js";
import type { GlobalFormProps, TextsProp } from "$lib/logic/typing/globals/proptypes.js";

export type ContactFields = Exclude<keyof ContactValues, "phoneCode">;

export interface Props extends GlobalFormProps {
  phoneCode?: string;
  submit(values: ContactValues): Promise<void>;
  texts: TextsProp<ContactFields>;
}
