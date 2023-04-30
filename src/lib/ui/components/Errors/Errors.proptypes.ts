import type { GlobalFormProps } from "$lib/logic/typing/globals.proptypes.js";

export type Props = Pick<GlobalFormProps<unknown>, "context" | "showErrors">;
