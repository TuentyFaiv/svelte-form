import { getContext, hasContext, setContext } from "svelte";
import { derived, get, readable, writable } from "svelte/store";
import { FormError } from "../utils/errors.js";
import { parseValue } from "../utils/parse.js";
import { bridge } from "../utils/validation.js";
import { Adapter } from "../typing/stores/form.js";

// eslint-disable-next-line import/order
import type { Readable } from "svelte/store";
import type { UserEvent } from "../typing/globals/types.js";
import type { ContextStyles } from "../typing/stores/styles.js";
import type {
  Fields,
  FieldsSchema,
  FaivFormConfig,
  FaivFormStore,
  SubmitAction,
  SubmitConfig,
  Submit,
  SetErrorsConfig,
  ContextForm,
} from "../typing/stores/form.js";
import type { Errors } from "../typing/utils/errors.js";
import type { Infer } from "../typing/utils/validation.js";

export function faivform<
S extends Fields = FieldsSchema,
F extends Fields = Infer<S>,
A extends Adapter<F> = Adapter<F>>({
  fields,
  context = "form",
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

  const adapter = fields instanceof Adapter ? fields : bridge<S, F>(fields);
  const initial = adapter.initial();

  type Values = typeof initial.fields;
  type Keys = keyof Values;
  type Form = FaivFormStore<Values, Keys>;

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

  function resetForm(clear = true, starting: Values = initial.fields): void {
    form?.reset();

    data.set(starting);

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

  setContext(context, contextform);

  if (hasContext("faivform-styles")) {
    const globalStyles = get(getContext<Readable<ContextStyles>>("faivform-styles"));
    const formStyles = get(ctxStyles);

    const updatedStyles: ContextStyles = Object.entries(globalStyles).reduce((acc, [key, value]) => {
      const keyStyle = key as keyof ContextStyles;
      const globalStyle = value as ContextStyles[keyof ContextStyles];
      const formStyle = formStyles[keyStyle];

      if (typeof globalStyle === "undefined" || globalStyle === null || Object.keys(globalStyle ?? {}).length === 0) return acc;

      if (keyStyle === "replace" || typeof globalStyle === "boolean") {
        return {
          ...acc,
          [keyStyle]: formStyle || globalStyle,
        };
      }

      const updated = Object.entries(globalStyle).reduce((prev, [element, style]) => {
        const elementKey = element as keyof typeof globalStyle;
        const elementStyle = style as string | undefined;
        const formElementStyle = formStyle?.[elementKey] as string | undefined;

        return {
          ...prev,
          [element]: formElementStyle ?? elementStyle,
        } as typeof globalStyle;
      }, {} as typeof globalStyle);

      return {
        ...acc,
        [keyStyle]: updated,
      };
    }, {});

    ctxStyles.update((prev) => ({ ...prev, ...updatedStyles }));
  }

  function submit<T extends Values = Values>(action: SubmitAction<T>, { reset = true, ...config }: SubmitConfig<T> = {}): Submit {
    if (config.initial) data.set(config.initial);

    async function onSubmit(event: UserEvent<HTMLFormElement, SubmitEvent>) {
      try {
        toggleLoading(true);

        form = event.currentTarget;
        const values = await validation<T>();

        await action(values);

        if (reset) resetForm(true, config.initial);
      } catch (error) {
        setErrors({ error, handle: config.error });
      } finally {
        toggleLoading(false);
        config.finish?.();
      }
    }

    return onSubmit;
  }

  setContext(`root-${context}`, derived(contextform, ($ctx) => ({
    ...$ctx,
    submit,
  })));

  return getContext<Readable<Form>>(`root-${context}`);
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

  return getContext<ContextForm<Values, Keys>>(context);
}
