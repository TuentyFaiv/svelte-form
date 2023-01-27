import { setContext } from "svelte";
import { derived, get, readable, writable } from "svelte/store";
import { object } from "yup";
import swal from "sweetalert";
import { toggle } from "../utils/booleans";
import { fieldsValidation, fieldValidation } from "../utils/validation";
import { setError, setErrors } from "../utils/errors";

// eslint-disable-next-line import/order
import type { Readable } from "svelte/store";
import type { ActionConfig, Data, Fields, FormContext, Submit, SubmitActions } from "../typing/stores.form";
import type { Errors } from "../typing/utils.errors";

export function formStore(fields: Fields, ns = "forms") {
  let form: HTMLFormElement | null = null;
  const sfields: Fields = { ...fields };
  const namespace: string = ns;
  const schema = object().shape(sfields);
  const errors = writable<Errors>(Object.keys(sfields).reduce((acc, err) => ({
    ...acc,
    [err]: null
  }), {}));
  const loading = writable<boolean>(false);
  const data = writable<Data>({});

  function toggleLoading(value?: unknown): void {
    toggle(loading, value);
  }

  function setFieldError(key: string, error?: unknown): void {
    setError({ key, error, errors, ns: namespace });
  }

  function setFieldsErrors(error: unknown, handle?: (error?: unknown) => void): void {
    setErrors({ error, errors, ns: namespace, handle });
  }

  async function validation<T extends Data = Data>(formToValidate: HTMLFormElement): Promise<T> {
    form = formToValidate;
    const formData = Object.fromEntries(new FormData(form).entries());

    const parsedData: T = Object.keys(formData).reduce((acc, key) => {
      const isOn = formData[key] === "on";
      const isBoolean = (isOn) || (formData[key] === "off");

      return {
        ...acc,
        [key]: isBoolean ? isOn : formData[key]
      };
    }, {} as T);

    const toValidate: T = {
      ...parsedData,
      ...get(data)
    };

    await fieldsValidation(toValidate, schema);

    return toValidate;
  }

  async function setField(field: string, value: unknown, validate = true) {
    const clear = typeof value === "undefined";
    data.update((prev) => {
      const toUpdate = { ...prev };
      if (clear) {
        delete toUpdate[field];
        return toUpdate;
      }

      return {
        ...prev,
        [field]: value
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
      schema: sfields,
      errors,
      ns: namespace
    });
  }

  async function check(event: FocusEvent | Event): Promise<void> {
    const { name, value } = event.target as HTMLInputElement;
    data.update((prev) => ({
      ...prev,
      [name]: value
    }));
    await fieldValidation({
      event,
      schema: sfields,
      errors,
      ns: namespace
    });
  }

  async function action({ title, message, type }: ActionConfig = {}): Promise<void> {
    if (title && message && type) {
      await swal(title, message, type);
    }
    if (form && type === "success") {
      form.reset();
      data.set({});
    }
  }

  const context = readable<Omit<FormContext, "submit">>({
    loading,
    errors,
    data,
    setError: setFieldError,
    setField,
    check,
    action
  });

  function submit<T extends Data = Data>(handleData: Submit<T>, { error, finish, contextns = "form" }: SubmitActions = {}) {
    setContext(contextns, context);
    async function onSubmit(event: SubmitEvent) {
      try {
        toggleLoading(true);
        const formElement = event.target as HTMLFormElement;

        const values = await validation<T>(formElement);

        await handleData(values);

        await action({ type: "success" });
      } catch (err) {
        setFieldsErrors(err);
        error?.(err);
      } finally {
        toggleLoading(false);
        finish?.();
      }
    }

    return onSubmit;
  }

  const contextWithSubmit: Readable<FormContext> = derived(context, ($context) => ({
    ...$context,
    submit
  }));

  return contextWithSubmit;
}
