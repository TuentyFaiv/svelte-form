import type { Writable } from "svelte/store";
import type { Errors } from "../utils/errors.js";
import type {
  Submit,
  SubmitAction,
  SubmitOptions,
} from "../stores/form.js";
import type {
  ErrorsStyles,
  FileStyles,
  Icons,
  FieldStyles,
  OptionStyles,
  SelectStyles,
} from "./styles.js";

export interface ContextStyles {
  /** Set to true to replace the default styles  @default false */
  replace?: boolean;
  field?: FieldStyles;
  file?: FileStyles;
  select?: SelectStyles;
  option?: OptionStyles;
  icons?: Icons | null;
  errors?: ErrorsStyles;
}

export interface ContextForm<Values, Fields> {
  loading: Writable<boolean>;
  errors: Writable<Errors>;
  data: Writable<Values>;
  reset(resetErrors?: boolean): void;
  setError(name: Fields, error?: unknown): void;
  setField(field: Fields, value: unknown, validate?: boolean): Promise<void>;
  check(event: FocusEvent | Event): Promise<void>;
  submit<T extends Values>(action: SubmitAction<T>, options?: SubmitOptions): Submit;
  styles: Writable<ContextStyles>;
}
