import type { Writable } from "svelte/store";
import type { Errors } from "../utils/errors.js";
import type {
  ErrorsStyles,
  FileInputStyles,
  InputStyles,
  OptionStyles,
  SelectStyles
} from "../globals/proptypes.js";

export interface StoreConfig<T> {
  fields: T;
  ns?: string;
  styles?: StoreStyles;
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
  styles: Writable<StoreStyles>;
}

export interface ActionConfig {
  title?: string;
  message?: string;
  type?: "info" | "warning" | "success";
}

type Submit = (event: SubmitEvent) => Promise<void>;

export type Message = (msg: string) => (string | null);

export type SubmitAction<T> = (values: T) => Promise<void>;

export interface SubmitOptions {
  error?(error: unknown): void;
  finish?: VoidFunction;
  context?: string;
  success?: Success;
}

interface Success {
  title: string;
  message: string;
}

export interface FieldsErrorsConfig {
  error: unknown;
  handle?: (error: unknown) => void;
}

export interface StoreStyles {
  input?: InputStyles;
  fileinput?: FileInputStyles;
  select?: SelectStyles;
  option?: OptionStyles;
  icons?: Icons | null;
  errors?: ErrorsStyles;
}

interface Icons {
  show?: string;
  hide?: string;
}
