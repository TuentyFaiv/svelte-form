<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { cx } from "@emotion/css";
  import { Errors, Field, faivform } from "@tuentyfaiv/svelte-form";
  import { getTexts } from "$lib/logic/utils/objects.js";
  import { fieldsSignin } from "$lib/logic/schemas/index.js";
  import { useGlobalFormStyles } from "$lib/logic/stores/config.js";

  import type { FieldInputForm } from "$lib/logic/typing/globals/interfaces.js";
  import type { Props, SigninFields } from "./SigninForm.proptypes.js";

  import * as stylesinternal from "./SigninForm.styles.js";

  export let submit: Props["submit"];
  export let context: Props["context"] = "form";
  export let showErrors: Props["showErrors"] = true;
  export let styles: Props["styles"] = undefined;
  export let remember: Props["remember"] = true;
  export let texts: Props["texts"] = {};

  const dispatch = createEventDispatcher<{
    error: unknown;
    finish: undefined;
  }>();
  const { remember: rememberField, ...fieldsRemaining } = fieldsSignin;
  const globalStyles = useGlobalFormStyles();
  $: formStyles = styles?.form ?? $globalStyles ?? {};

  $: store = faivform({
    fields: {
      ...fieldsRemaining,
      ...(remember ? { remember: rememberField } : {}),
    },
    styles: {
      field: styles?.field ?? {},
      icons: styles?.icons ?? null,
    },
  });
  $: ({
    submit: onSubmit,
    loading: isLoading,
    data,
    errors,
    setField,
    check,
    setError,
    reset,
    styles: stylesStore,
  } = $store);
  $: loading = $isLoading;

  $: action = onSubmit(submit, {
    error(err) {
      dispatch("error", err);
    },
    finish() {
      dispatch("finish");
    },
    context,
  });

  $: fields = (
    [
      {
        name: "email",
        type: "email",
      },
      {
        name: "password",
        type: "password",
      },
      ...(remember
        ? ([
            {
              name: "remember",
              type: "checkbox",
            },
          ] satisfies FieldInputForm<SigninFields>[])
        : ([] satisfies FieldInputForm<SigninFields>[])),
    ] satisfies FieldInputForm<SigninFields>[]
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
        {#each fields as field (field.name)}
          <Field {...field} {context}>
            <slot name="field" />
            <svelte:fragment slot="error" let:error>
              <slot name="error-field" {error}>
                {error}
              </slot>
            </svelte:fragment>
          </Field>
        {/each}
      </slot>
    {/key}
  </div>
  <button
    class={cx(stylesinternal.submit, formStyles.submit ?? "")}
    type="submit"
  >
    <slot name="submit">Signin</slot>
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
