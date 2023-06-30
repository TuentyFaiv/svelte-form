import type { ContactValues } from "$lib/logic/typing/schemas/contact.js";
import type { GlobalFormProps, TextsProp } from "$lib/logic/typing/globals/proptypes.js";
import type { SubmitOptions } from "$lib/logic/typing/stores/form.js";

export type ContactFields = Exclude<keyof ContactValues, "phoneCode">;

export interface Props extends GlobalFormProps {
  phoneCode?: string;
  success: SubmitOptions["success"];
  submit(values: ContactValues): Promise<void>;
  texts: TextsProp<ContactFields>;
}
