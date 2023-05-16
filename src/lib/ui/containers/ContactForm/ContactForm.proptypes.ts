import type { GlobalFormProps } from "$lib/logic/typing/globals/proptypes.js";
import type { SubmitOptions } from "$lib/logic/typing/stores/form.js";

export interface Props extends GlobalFormProps {
  phoneCode?: string;
  success: SubmitOptions["success"];
}
