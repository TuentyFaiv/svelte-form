import type { ContactValues } from "$lib/logic/typing/schemas/contact.js";
import type { GlobalFormProps, TextProp } from "$lib/logic/typing/globals/proptypes.js";
import type { SubmitOptions } from "$lib/logic/typing/stores/form.js";

export interface Props extends GlobalFormProps {
  phoneCode?: string;
  success: SubmitOptions["success"];
  submit(values: ContactValues): Promise<void>;
  texts: {
    message: TextProp;
    name: TextProp;
    phone: TextProp;
    email: TextProp;
    terms: TextProp;
  }
}
