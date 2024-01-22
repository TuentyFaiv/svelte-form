import type { Writable, Readable } from "svelte/store";
import type { Errors } from "../utils/errors.js";
import type {
  Fields,
  Submit,
  SubmitAction,
  SubmitConfig,
} from "../stores/form.js";
import type {
  ErrorsStyles,
  FileStyles,
  Icons,
  FieldStyles,
  OptionStyles,
  SelectStyles,
} from "./styles.js";
import type { UserEvent } from "./types.js";

export interface ContextStyles {
  /** Set to true to replace the default styles  @default false */
  replace?: boolean;
  /** Styles for the field component */
  field?: FieldStyles;
  /** Styles for the file component */
  file?: FileStyles;
  /** Styles for the select component */
  select?: SelectStyles;
  /** Styles for the option component */
  option?: OptionStyles;
  /** Component icons paths */
  icons?: Icons | null;
  /** Styles for the errors component */
  errors?: ErrorsStyles;
}

export interface ContextForm<Values extends Fields, Keys extends keyof Values = keyof Values> {
  loading: Writable<boolean>;
  errors: Writable<Errors<Values>>;
  data: Writable<Values>;
  styles: Writable<ContextStyles>;
  reset(clear?: boolean, starting?: Values): void;
  setError(field: Keys, error?: string | null): Promise<void>;
  setField(field: Keys, value: Values[Keys], validate?: boolean): Promise<void>;
  check(event: UserEvent<HTMLInputElement | HTMLTextAreaElement, FocusEvent | Event>): Promise<void>;
  submit<T extends Fields = Values>(action: SubmitAction<T>, config?: SubmitConfig<T>): Submit;
}

export type Context<T extends Fields, K extends keyof T = keyof T> = Omit<ContextForm<T, K>, "submit">;

export type ContextFormStore<T extends Fields, K extends keyof T = keyof T> = Readable<Context<T, K>>;
