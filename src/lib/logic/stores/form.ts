import { getContext, hasContext, setContext } from "svelte";
import { derived, get, readable, writable } from "svelte/store";
import { object } from "yup";
import { toggle, transformOnOff } from "../utils/booleans.js";
import { fieldsValidation, fieldValidation } from "../utils/validation.js";
import { FormError, setError, setErrors } from "../utils/errors.js";

// eslint-disable-next-line import/order
import type { AnyObject, InferType } from "yup";
// eslint-disable-next-line import/order
import type { Readable } from "svelte/store";
import type { ContextForm, ContextStyles } from "../typing/globals/contexts.js";
import type {
  FieldsErrorsConfig,
  FormStoreConfig,
  SubmitAction,
  SubmitOptions,
} from "../typing/stores/form.js";
import type { Errors } from "../typing/utils/errors.js";

export function faivform<SchemaFields extends AnyObject = AnyObject>({
  fields,
  styles = {},
}: FormStoreConfig<SchemaFields>) {
  let form: HTMLFormElement | null = null;
  const ctxStyles = writable<ContextStyles>({
    field: styles.field ?? {},
    option: styles.option ?? {},
    select: styles.select ?? {},
    file: styles.file ?? {},
    errors: styles.errors ?? {},
    icons: styles.icons ?? null,
  });
  const schemafields: SchemaFields = { ...fields };
  const schema = object(schemafields);

  type Values = InferType<typeof schema>;
  type Fields = keyof Values;
  type Form = ContextForm<Values, Fields>;

  const errors = writable<Errors>(Object.keys(schemafields).reduce((acc, key) => ({
    ...acc,
    [key]: null,
  }), {}));
  const loading = writable<boolean>(false);
  const data = writable<Values>(schema.getDefault() as Values);

  function toggleLoading(value?: unknown): void {
    toggle(loading, value);
  }

  function setFieldError(key: Fields, error?: unknown): void {
    setError({ key, error, errors });
  }

  function setFieldsErrors({ error, handle }: FieldsErrorsConfig): void {
    setErrors({ error, errors, handle });
  }

  function reset(resetErrors = true): void {
    data.set(schema.getDefault() as Values);
    form?.reset();
    if (!resetErrors) return;

    errors.set(Object.keys(schemafields).reduce((acc, key) => ({
      ...acc,
      [key]: null,
    }), {}));
  }

  async function validation<T>(formToValidate: HTMLFormElement): Promise<T> {
    form = formToValidate;
    const formData = Object.fromEntries(new FormData(form).entries());

    const parsedData = {
      ...formData,
      ...get(data),
    };

    const toValidate: T = Object.keys(parsedData).reduce((acc, key) => ({
      ...acc,
      [key]: transformOnOff(parsedData[key]),
    }), {} as T);

    await fieldsValidation(toValidate, schema);

    return toValidate;
  }

  async function setField(field: Fields, value: unknown, validate = true) {
    const clear = typeof value === "undefined";

    data.update((prev) => {
      const toUpdate = { ...prev };
      if (clear) {
        delete toUpdate[field];
        return toUpdate;
      }

      return {
        ...prev,
        [field]: transformOnOff(value),
      };
    });

    if (clear) {
      setFieldError(field);
      return;
    }

    if (!validate) return;

    await fieldValidation({
      value,
      field,
      schema: schemafields[String(field)],
      errors,
    });
  }

  async function check(event: FocusEvent | Event): Promise<void> {
    const { name, value, type } = event.target as HTMLInputElement;

    data.update((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : transformOnOff(value),
    }));

    await fieldValidation({
      value,
      field: name,
      schema: schemafields[name],
      errors,
    });
  }

  const contextform = readable<Omit<Form, "submit">>({
    loading,
    errors,
    data,
    styles: ctxStyles,
    reset,
    setError: setFieldError,
    setField,
    check,
  });

  function submit<T extends Values = Values>(
    handleData: SubmitAction<T>,
    {
      error,
      finish,
      context = "form",
      reset: resetForm = true,
    }: SubmitOptions = {},
  ) {
    const globalStyles = get(getContext<Readable<ContextStyles | undefined>>("styles"));

    if (globalStyles) {
      Object.keys(globalStyles).forEach((key) => {
        const keyStyle = key as keyof ContextStyles;
        const globalStyle = globalStyles[keyStyle];

        ctxStyles.update((prev) => {
          const validPrev = Object.keys(prev[keyStyle] ?? {}).length === 0 ? null : prev[keyStyle];
          const validGlobal = Object.keys(globalStyle ?? {}).length === 0 ? null : globalStyle;

          return {
            ...prev,
            [keyStyle]: validPrev ?? validGlobal,
          };
        });
      });
    }

    setContext(context, contextform);
    async function onSubmit(event: SubmitEvent) {
      try {
        toggleLoading(true);
        const formElement = event.target as HTMLFormElement;

        const values = await validation<T>(formElement);

        await handleData(values);

        if (resetForm) reset(true);
      } catch (err) {
        setFieldsErrors({ error: err, handle: error });
      } finally {
        toggleLoading(false);
        finish?.();
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

export function useForm<Values extends AnyObject, Fields extends string>(context = "form") {
  if (!hasContext(context)) {
    throw new FormError({
      title: "Form Error",
      // eslint-disable-next-line max-len
      message: `Error to get form context: ${context}. You must create the form context in a parent component using the faivform function.`,
      reason: `The context "${context}" that does not exist.`,
    });
  }

  return getContext<Readable<ContextForm<Values, Fields>>>(context);
}
