import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
import type { GlobalFormProps } from "$lib/logic/typing/globals/proptypes.js";
import type { SubmitOptions } from "$lib/logic/typing/stores/form.js";

export interface Props extends GlobalFormProps {
  options: SelectOption[];
  code: "bycountry" | "byphone";
  confirm: boolean;
  success: SubmitOptions["success"];
}
