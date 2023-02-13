import type { GlobalFormProps } from "$lib/logic/typing/globals.proptypes";

export type Props = Pick<GlobalFormProps<unknown>, "context" | "showErrors">;
