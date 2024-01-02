<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { cx } from "@emotion/css";
  import { Errors, Field, faivform } from "@tuentyfaiv/svelte-form";
  import { getTexts } from "$lib/logic/utils/objects.js";
  import { fieldsContact } from "$lib/logic/schemas/index.js";
  import { useGlobalFormStyles } from "$lib/logic/stores/config.js";

  import type { FieldInputForm } from "$lib/logic/typing/globals/interfaces.js";
  import type { ContactFields, Props } from "./ContactForm.proptypes.js";

  import * as stylesinternal from "./ContactForm.styles.js";

  export let submit: Props["submit"];
  export let phoneCode: Props["phoneCode"] = undefined;
  export let context: Props["context"] = "form";
  export let showErrors: Props["showErrors"] = true;
  export let styles: Props["styles"] = undefined;
  export let texts: Props["texts"] = {};

  const dispatch = createEventDispatcher<{
    error: unknown;
    finish: undefined;
  }>();
  const globalStyles = useGlobalFormStyles();
  $: formStyles = styles?.form ?? $globalStyles ?? {};

  $: form = faivform({
    fields: fieldsContact,
    styles: {
      field: styles?.field ?? {},
      icons: styles?.icons ?? null,
    },
  });
  $: ({
    submit: onSubmit,
    setField,
    loading: isLoading,
    data,
    errors,
    setError,
    check,
    reset,
    styles: stylesStore,
  } = $form);
  $: loading = $isLoading;

  $: action = onSubmit(submit, {
    error(err) {
      dispatch("error", err);
    },
    finish() {
      setField("phoneCode", phoneCode);
      dispatch("finish");
    },
    context,
  });

  $: fields = (
    [
      {
        name: "name",
        type: "text",
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
        name: "message",
        type: "textarea",
      },
      {
        name: "terms",
        type: "checkbox",
      },
    ] satisfies FieldInputForm<ContactFields>[]
  ).map(getTexts(texts));

  $: {
    if (phoneCode) {
      setField("phoneCode", phoneCode);
    }
  }
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
    <slot name="submit">Send message</slot>
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
