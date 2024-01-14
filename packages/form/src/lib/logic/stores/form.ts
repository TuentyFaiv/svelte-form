import { getContext, hasContext, setContext } from "svelte";
import { derived, get, readable, writable } from "svelte/store";

import { FormVarStyles } from "./styles.js";
import { FormError } from "../utils/errors.js";
import { parseValue } from "../utils/parse.js";
import { bridge } from "../utils/validation.js";
import { Adapter } from "../typing/stores/form.js";

// eslint-disable-next-line import/order
import type { Readable } from "svelte/store";
import type { ContextForm, ContextStyles } from "../typing/globals/contexts.js";
import type { UserEvent } from "../typing/globals/types.js";
import type {
  Fields,
  FieldsSchema,
  FaivFormConfig,
  SubmitAction,
  SubmitConfig,
  Submit,
  SetErrorsConfig,
} from "../typing/stores/form.js";
import type { Errors } from "../typing/utils/errors.js";
import type { Infer } from "../typing/utils/validation.js";

export function faivform<
S extends Fields = FieldsSchema,
F extends Fields = Infer<S>,
A extends Adapter<F> = Adapter<F>>({
  fields,
  styles = {},
}: FaivFormConfig<F, S | A>) {
  let form: HTMLFormElement | null = null;
  const ctxStyles = writable<ContextStyles>({
    replace: styles.replace ?? false,
    field: styles.field ?? {},
    option: styles.option ?? {},
    select: styles.select ?? {},
    file: styles.file ?? {},
    errors: styles.errors ?? {},
    icons: styles.icons ?? null,
  });
  FormVarStyles.create();

  const adapter = fields instanceof Adapter ? fields : bridge<S, F>(fields);
  const initial = adapter.initial();

  type Values = typeof initial.fields;
  type Keys = keyof Values;
  type Form = ContextForm<Values, Keys>;

  const loading = writable<boolean>(false);
  const errors = writable<Errors<Values>>(initial.errors);
  const data = writable<Values>(initial.fields);

  function toggleLoading(value?: unknown): void {
    if (typeof value === "boolean") {
      loading.set(value);
    } else {
      loading.update((prev) => !prev);
    }
  }

  async function setError(field: Keys, error: string | null = null): Promise<void> {
    errors.update((prev) => ({ ...prev, [field]: error }));
  }

  function setErrors({ error, handle }: SetErrorsConfig): void {
    adapter.errors(error, errors, handle);
  }

  async function setField(field: Keys, value: Values[Keys], validate = true): Promise<void> {
    data.update((prev) => ({ ...prev, [field]: value }));

    if (typeof value === "undefined" && !validate) {
      setError(field);
      return;
    }

    if (validate) {
      await adapter.field(field, value, errors);
    }
  }

  async function check(event: UserEvent<HTMLInputElement | HTMLTextAreaElement, FocusEvent | Event>): Promise<void> {
    const { name } = event.currentTarget;

    const value = parseValue<Values[Keys]>(event.currentTarget);

    data.update((prev) => ({ ...prev, [name]: value }));

    await adapter.field(name, value, errors);
  }

  async function validation<T = Values>(): Promise<T> {
    if (!form) {
      throw new FormError({
        title: "Form not found",
        message: "Error to get form element.",
        reason: "The form element is null. Check if you are the on:submit event in a form element.",
      });
    }
    const formData = Object.fromEntries(new FormData(form).entries());

    const allData = { ...formData, ...get(data) } as T;

    await adapter.validate<T>(allData);

    return allData;
  }

  function resetForm(clear = true): void {
    data.set(initial.fields);

    form?.reset();

    if (clear) {
      errors.set(initial.errors);
    }
  }

  const contextform = readable<Omit<Form, "submit">>({
    loading,
    errors,
    data,
    styles: ctxStyles,
    reset: resetForm,
    setError,
    setField,
    check,
  });

  function submit<T extends Fields = Values>(
    action: SubmitAction<T>,
    {
      context = "form",
      reset = true,
      ...config
    }: SubmitConfig<T> = {},
  ): Submit {
    if (hasContext("styles")) {
      const globalStyles = get(getContext<Readable<ContextStyles>>("styles"));
      Object.keys(globalStyles).forEach((key) => {
        const keyStyle = key as keyof ContextStyles;

        ctxStyles.update((prev) => {
          if (keyStyle === "replace") {
            const validPrev = prev[keyStyle] ?? false;
            const validGlobal = globalStyles[keyStyle] ?? false;

            return {
              ...prev,
              [keyStyle]: validPrev || validGlobal,
            };
          }

          const validPrev = Object.keys(prev[keyStyle] ?? {}).length === 0 ? null : prev[keyStyle];
          const validGlobal = Object.keys(globalStyles[keyStyle] ?? {}).length === 0 ? null : globalStyles[keyStyle];

          return {
            ...prev,
            [keyStyle]: validPrev ?? validGlobal,
          };
        });
      });
    }

    setContext(context, contextform);
    async function onSubmit(event: UserEvent<HTMLFormElement, SubmitEvent>) {
      try {
        toggleLoading(true);

        form = event.currentTarget;
        const values = await validation<T>();

        await action(values);

        if (reset) resetForm(true);
      } catch (error) {
        setErrors({ error, handle: config.error });
      } finally {
        toggleLoading(false);
        config.finish?.();
      }
    }

    return onSubmit;
  }

  const context: Readable<Form> = derived(contextform, ($ctx) => ({
    ...$ctx,
    submit,
  }));

  return context;
}

export function useForm<Values extends Fields = Fields, Keys extends keyof Values = keyof Values>(context = "form") {
  if (!hasContext(context)) {
    throw new FormError({
      title: "Unknow form context",
      // eslint-disable-next-line max-len
      message: `Error to get form context: ${context}. You must create the form context in a parent component using the faivform function.`,
      reason: `The context "${context}" does not exist.`,
    });
  }

  return getContext<Readable<ContextForm<Values, Keys>>>(context);
}
