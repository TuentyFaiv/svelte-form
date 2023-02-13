import type { ContactValues } from "$lib/logic/typing/schemas.contact";
import type { GlobalFormProps } from "$lib/logic/typing/globals.proptypes";

export interface Props extends GlobalFormProps<ContactValues> {
  phoneCode?: string;
}
