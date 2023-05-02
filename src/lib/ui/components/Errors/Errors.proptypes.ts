import type { GlobalFormProps } from "$lib/logic/typing/globals/proptypes.js";

export interface Props extends Pick<GlobalFormProps, "context"> {
  show: GlobalFormProps["showErrors"];
}
