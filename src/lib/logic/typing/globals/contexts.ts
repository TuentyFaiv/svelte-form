import type { Writable } from "svelte/store";
import type { Errors } from "../utils/errors.js";
import type {
  ActionConfig,
  Submit,
  SubmitAction,
  SubmitOptions
} from "../stores/form.js";
import type {
  ErrorsStyles,
  FileInputStyles,
  Icons,
  InputStyles,
  OptionStyles,
  SelectStyles
} from "./styles.js";

export interface ContextStyles {
  input?: InputStyles;
  fileinput?: FileInputStyles;
  select?: SelectStyles;
  option?: OptionStyles;
  icons?: Icons | null;
  errors?: ErrorsStyles;
}

export interface FormContext<Values, Fields> {
  loading: Writable<boolean>;
  errors: Writable<Errors>;
  data: Writable<Values>;
  setError(name: Fields, error?: unknown): void;
  setField(field: Fields, value: unknown, validate?: boolean): Promise<void>;
  check(event: FocusEvent | Event): Promise<void>;
  action(data?: ActionConfig): Promise<void>;
  submit<T extends Values>(action: SubmitAction<T>, options?: SubmitOptions): Submit;
  styles: Writable<ContextStyles>;
}