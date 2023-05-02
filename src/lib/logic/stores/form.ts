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
import type {
  ActionConfig,
  FieldsErrorsConfig,
  FormContext,
  StoreConfig,
  StoreStyles,
  SubmitAction,
  SubmitOptions
} from "../typing/stores/form.js";
import type { Errors } from "../typing/utils/errors.js";

export function formStore<SchemaFields extends AnyObject = AnyObject>({
  fields,
  styles = {},
  ns = "forms",
  t = (msg) => (msg)
}: StoreConfig<SchemaFields>) {
  let form: HTMLFormElement | null = null;
  const {
    input = {},
    option = {},
    select = {},
    fileinput = {},
    errors: errorsStyles = {},
    icons = null
  } = styles;
  const ctxStyles = writable<StoreStyles>({
    input,
    option,
    select,
    fileinput,
    errors: errorsStyles,
    icons
  });
  const schemafields: SchemaFields = { ...fields };
  const namespace: string = ns;
  const schema = object(schemafields);

  type Values = InferType<typeof schema>;
  type Fields = keyof Values;
  type Form = FormContext<Values, Fields>;

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
    setError({ key, error, errors, ns: namespace });
  }

  function setFieldsErrors({ error, handle }: FieldsErrorsConfig): void {
    setErrors({ error, errors, ns: namespace, handle });
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
      ns: namespace
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
      ns: namespace
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
    action,
    t
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
    const globalStyles = get(getContext<Readable<StoreStyles | undefined>>("styles"));

    if (globalStyles) {
      Object.keys(globalStyles).forEach((key) => {
        const fieldStyles = globalStyles[key as keyof StoreStyles];
        if (fieldStyles && Object.keys(fieldStyles).length > 0) {
          ctxStyles.update((prev) => ({
            ...prev,
            [key]: fieldStyles
          }));
        }
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
