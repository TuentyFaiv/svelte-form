<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { getTexts } from "$lib/logic/utils/objects.js";
  import { FormError } from "$lib/logic/utils/errors.js";
  import { fieldsSignup } from "$lib/logic/schemas/index.js";
  import { formStore } from "$lib/logic/stores/index.js";

  import type { Readable } from "svelte/store";
  import type { FieldInputForm } from "$lib/logic/typing/globals/interfaces.js";
  import type { Config } from "$lib/logic/typing/stores/config.js";
  import type { SignupValues } from "$lib/logic/typing/schemas/auth.js";
  import type { Props, SignupFields } from "./SignupForm.proptypes.js";

  import * as stylesinternal from "./SignupForm.styles.js";

  import { Errors, Field, Select } from "$lib/ui/components/index.js";

  export let submit: Props["submit"];
  export let context: Props["context"] = "form";
  export let showErrors: Props["showErrors"] = undefined;
  export let options: Props["options"] = [];
  export let code: Props["code"] = "bycountry";
  export let confirm: Props["confirm"] = true;
  export let styles: Props["styles"] = undefined;
  export let success: Props["success"] = undefined;
  export let texts: Props["texts"];

  const globalStyles = getContext<Readable<Config["form"]>>("formStyles");
  $: formStyles = styles?.form ?? $globalStyles ?? stylesinternal ?? {};
  const { confirmPassword, ...fieldsRemaining } = fieldsSignup;

  $: store = formStore({
    fields: { ...fieldsRemaining, ...(confirm ? { confirmPassword } : {}) },
    styles: {
      field: styles?.field ?? {},
      select: styles?.select ?? {},
      icons: styles?.icons ?? null,
    },
  });
  $: ({ submit: onSubmit, setField, setError, loading } = $store);
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
      success,
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
    ] satisfies FieldInputForm<SignupFields, "select">[]
  ).map(getTexts(texts));
</script>

{#if $loading}
  <slot name="loading" />
{/if}

<form on:submit|preventDefault={action} class={formStyles.container}>
  <div class={formStyles.box}>
    <slot>
      {#each fields as { type, ...field } (field.name)}
        {#if type !== "select"}
          <Field {...field} {type} {context}>
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
  </div>
  <button class={formStyles.submit} type="submit">
    <slot name="submit">Signup</slot>
  </button>
  <Errors show={showErrors} {context}>
    <svelte:fragment slot="error" let:error let:field>
      <slot name="error-list" {error} {field}>
        {`${field}: ${error}`}
      </slot>
    </svelte:fragment>
  </Errors>
</form>
