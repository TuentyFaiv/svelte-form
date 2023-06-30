import { getContext, setContext } from "svelte";
import { derived, get, readable, writable } from "svelte/store";
import { object } from "yup";
import swal from "sweetalert";
import { toggle, transformOnOff } from "../utils/booleans.js";
import { fieldsValidation, fieldValidation } from "../utils/validation.js";
import { setError, setErrors } from "../utils/errors.js";

// eslint-disable-next-line import/order
import type { AnyObject, InferType } from "yup";
// eslint-disable-next-line import/order
import type { Readable } from "svelte/store";
import type { ContextForm, ContextStyles } from "../typing/globals/contexts.js";
import type {
  ActionConfig,
  FieldsErrorsConfig,
  FormStoreConfig,
  SubmitAction,
  SubmitOptions
} from "../typing/stores/form.js";
import type { Errors } from "../typing/utils/errors.js";

export function formStore<SchemaFields extends AnyObject = AnyObject>({
  fields,
  styles = {},
}: FormStoreConfig<SchemaFields>) {
  let form: HTMLFormElement | null = null;
  const {
    input = {},
    option = {},
    select = {},
    fileinput = {},
    errors: errorsStyles = {},
    icons = null
  } = styles;
  const ctxStyles = writable<ContextStyles>({
    input,
    option,
    select,
    fileinput,
    errors: errorsStyles,
    icons
  });
  const schemafields: SchemaFields = { ...fields };
  const schema = object(schemafields);

  type Values = InferType<typeof schema>;
  type Fields = keyof Values;
  type Form = ContextForm<Values, Fields>;

  const errors = writable<Errors>(Object.keys(schemafields).reduce((acc, key) => ({
    ...acc,
    [key]: null
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

  async function validation<T>(formToValidate: HTMLFormElement): Promise<T> {
    form = formToValidate;
    const formData = Object.fromEntries(new FormData(form).entries());

    const parsedData = {
      ...formData,
      ...get(data)
    };

    const toValidate: T = Object.keys(parsedData).reduce((acc, key) => ({
      ...acc,
      [key]: transformOnOff(parsedData[key])
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
        [field]: transformOnOff(value)
      };
    });

    if (clear) {
      setFieldError(field);
      return;
    }

    if (!validate) return;

    await fieldValidation({
      event: {
        name: field,
        value
      },
      schema: schemafields,
      errors,
    });
  }

  async function check(event: FocusEvent | Event): Promise<void> {
    const { name, value } = event.target as HTMLInputElement;

    data.update((prev) => ({
      ...prev,
      [name]: transformOnOff(value)
    }));

    await fieldValidation({
      event,
      schema: schemafields,
      errors,
    });
  }

  async function action({ title, message, type }: ActionConfig = {}): Promise<void> {
    if (title && message && type) {
      await (swal as any)(title, message, type);
    }
    if (form && type === "success") {
      form.reset();
      data.set(schema.getDefault() as Values);
    }
  }

  const context = readable<Omit<Form, "submit">>({
    loading,
    errors,
    data,
    styles: ctxStyles,
    setError: setFieldError,
    setField,
    check,
    action
  });

  function submit<T extends Values = Values>(
    handleData: SubmitAction<T>,
    {
      error,
      finish,
      context: contextns = "form",
      success
    }: SubmitOptions = {}
  ) {
    const globalStyles = get(getContext<Readable<ContextStyles | undefined>>("styles"));

    if (globalStyles) {
      Object.keys(globalStyles).forEach((key) => {
        const keyStyle = key as keyof ContextStyles;
        const globalStyle = globalStyles[keyStyle];

        ctxStyles.update((prev) => {
          const validPrev = Object.keys(prev[keyStyle] ?? {}).length === 0 ? null : prev[keyStyle];
          const validGlobal = Object.keys(globalStyle ?? {}).length === 0 ? null : globalStyle;

          console.log({
            keyStyle,
            validGlobal,
            validPrev,
          });

          return {
            ...prev,
            [keyStyle]: validPrev ?? validGlobal
          };
        });
      });
    }

    setContext(contextns, context);
    async function onSubmit(event: SubmitEvent) {
      try {
        toggleLoading(true);
        const formElement = event.target as HTMLFormElement;

        const values = await validation<T>(formElement);

        await handleData(values);

        await action({
          type: "success",
          title: success?.title,
          message: success?.message
        });
      } catch (err) {
        setFieldsErrors({ error: err, handle: error });
      } finally {
        toggleLoading(false);
        finish?.();
      }
    }

    return onSubmit;
  }

  const contextWithSubmit: Readable<Form> = derived(context, ($context) => ({
    ...$context,
    submit
  }));

  return contextWithSubmit;
}
