import type { ContactValues } from "$lib/logic/typing/schemas/contact.js";
import type { GlobalFormProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends GlobalFormProps<ContactValues> {
  phoneCode?: string;
}
