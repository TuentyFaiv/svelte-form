import type { GlobalFormProps } from "$lib/logic/typing/globals/proptypes.js";
import type { Message } from "$lib/logic/typing/stores/form.js";

export interface Props extends Pick<GlobalFormProps, "context" | "t"> {
  show: GlobalFormProps["showErrors"];
}
