import type { Message, Styles, SubmitAction, SubmitOptions } from "$lib/logic/typing/stores.form";
import type { SignupValues } from "$lib/logic/typing/schemas.auth";
import type { FormStyles } from "$lib/logic/typing/globals.proptypes";

export interface Props {
  onSubmit: SubmitAction<SignupValues>;
  onError: SubmitOptions["error"];
  onFinish: SubmitOptions["finish"];
  context: SubmitOptions["contextns"];
  ns: string | undefined;
  t: Message | undefined;
  styles: StylesForm;
}

interface StylesForm extends Styles {
  signup: FormStyles;
}
