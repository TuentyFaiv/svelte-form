import type { GeneralFieldProps } from "$lib/logic/typing/globals/proptypes.js";
import type { ErrorsStyles } from "$lib/logic/typing/globals/styles.js";

export interface Props extends Pick<GeneralFieldProps, | "context" | "id"> {
  styles?: ErrorsStyles;
}
