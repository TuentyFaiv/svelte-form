<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    Errors,
    Field,
    FormError,
    Select,
    faivform,
  } from "@tuentyfaiv/svelte-form";
  import { getTexts } from "$lib/logic/utils/objects.js";
  import { fieldsSignup } from "$lib/logic/schemas/index.js";
  import { useGlobalFormStyles } from "$lib/logic/stores/config.js";

  import type { FieldInputForm } from "$lib/logic/typing/globals/interfaces.js";
  import type { SignupValues } from "$lib/logic/typing/schemas/auth.js";
  import type { Props, SignupFields } from "./SignupForm.proptypes.js";

  import * as stylesinternal from "./SignupForm.styles.js";
  import { cx } from "@emotion/css";

  export let submit: Props["submit"];
  export let context: Props["context"] = "form";
  export let showErrors: Props["showErrors"] = true;
  export let options: Props["options"] = [];
  export let code: Props["code"] = "bycountry";
  export let confirm: Props["confirm"] = true;
  export let styles: Props["styles"] = undefined;
  export let texts: Props["texts"] = {};

  const { confirmPassword, ...fieldsRemaining } = fieldsSignup;
  const globalStyles = useGlobalFormStyles();
  $: formStyles = styles?.form ?? $globalStyles ?? {};

  $: store = faivform({
    fields: { ...fieldsRemaining, ...(confirm ? { confirmPassword } : {}) },
    styles: {
      field: styles?.field ?? {},
      select: styles?.select ?? {},
      icons: styles?.icons ?? null,
    },
  });
  $: ({
    submit: onSubmit,
    setField,
    setError,
    loading: isLoading,
    data,
    errors,
    check,
    reset,
    styles: stylesStore,
  } = $store);
  $: loading = $isLoading;
  const dispatch = createEventDispatcher<{
    error: unknown;
    finish: undefined;
    choose: {
      value: string;
      setField: typeof setField;
      setError: typeof setError;
    };
  }>();

  function onChoose({ detail: value }: CustomEvent<string>) {
    dispatch("choose", { value, setField, setError });
  }

  $: action = onSubmit<SignupValues>(
    async (values) => {
      if (confirm && values.password.trim() !== values.confirmPassword.trim()) {
        const error = "password-not-match";
        setError("password", error);
        setError("confirmPassword", error);
        throw new FormError({
          title: "Error to signup",
          message: "Password and confirm password must be the same",
          reason: error,
        });
      }
      await submit(values);
    },
    {
      error(error) {
        dispatch("error", error);
      },
      finish: () => {
        dispatch("finish");
      },
      context,
    }
  );

  $: fields = (
    [
      {
        name: "firstName",
        type: "text",
      },
      {
        name: "lastName",
        type: "text",
      },
      {
        name: code === "bycountry" ? "country" : "phoneCode",
        type: "select",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "tel",
      },
      {
        name: "password",
        type: "password",
      },
      ...(confirm
        ? ([
            {
              name: "confirmPassword",
              type: "password",
            },
          ] satisfies FieldInputForm<SignupFields>[])
        : ([] satisfies FieldInputForm<SignupFields>[])),
      {
        name: "terms",
        type: "checkbox",
      },
    ] satisfies FieldInputForm<SignupFields, "select">[]
  ).map(getTexts(texts));
</script>

{#if loading}
  <slot name="loading" {loading} />
{/if}
<form
  on:submit|preventDefault={action}
  class={cx(stylesinternal.container, formStyles.container ?? "")}
>
  <div class={cx(stylesinternal.box, formStyles.box ?? "")}>
    {#key action}
      <slot
        {fields}
        {data}
        {errors}
        {setField}
        {setError}
        {check}
        {reset}
        styles={stylesStore}
      >
        {#each fields as { type, ...field } (field.name)}
          {#if type !== "select"}
            <Field {...field} {type} {context}>
              <slot name="field" />
              <svelte:fragment slot="error" let:error>
                <slot name="error-field" {error}>
                  {error}
                </slot>
              </svelte:fragment>
            </Field>
          {:else}
            <Select {...field} on:choose={onChoose} {options} {context}>
              <svelte:fragment slot="error" let:error>
                <slot name="error-field" {error}>
                  {error}
                </slot>
              </svelte:fragment>
            </Select>
          {/if}
        {/each}
      </slot>
    {/key}
  </div>
  <button
    class={cx(stylesinternal.submit, formStyles.submit ?? "")}
    type="submit"
  >
    <slot name="submit">Signup</slot>
  </button>
  {#key action}
    <Errors show={showErrors} {context}>
      <svelte:fragment slot="error" let:error let:field>
        <slot name="error-list" {error} {field}>
          {`${field}: ${error}`}
        </slot>
      </svelte:fragment>
    </Errors>
  {/key}
</form>
