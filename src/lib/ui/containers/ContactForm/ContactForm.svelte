<!-- <script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { getTexts } from "$lib/logic/utils/objects.js";
  import { fieldsContact } from "$lib/logic/schemas/index.js";
  import { faivform } from "$lib/logic/stores/index.js";

  import type { Readable } from "svelte/store";
  import type { FieldInputForm } from "$lib/logic/typing/globals/interfaces.js";
  import type { Config } from "$lib/logic/typing/stores/config.js";
  import type { ContactFields, Props } from "./ContactForm.proptypes.js";

  import * as stylesinternal from "./ContactForm.styles.js";

  import { Field, Errors } from "$lib/ui/components/index.js";

  export let submit: Props["submit"];
  export let phoneCode: Props["phoneCode"] = undefined;
  export let context: Props["context"] = "form";
  export let showErrors: Props["showErrors"] = undefined;
  export let styles: Props["styles"] = undefined;
  export let texts: Props["texts"];

  const globalStyles = getContext<Readable<Config["form"]>>("formStyles");
  $: formStyles = styles?.form ?? $globalStyles ?? stylesinternal ?? {};

  const store = faivform({
    fields: fieldsContact,
    styles: {
      field: styles?.field ?? {},
      icons: styles?.icons ?? null,
    },
  });
  const { submit: onSubmit, setField, loading } = $store;
  const dispatch = createEventDispatcher<{
    error: unknown;
    finish: undefined;
  }>();

  const action = onSubmit(submit, {
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

{#if $loading}
  <slot name="loading" />
{/if}

<form on:submit|preventDefault={action} class={formStyles.container}>
  <div class={formStyles.box}>
    <slot>
      {#each fields as field (field.name)}
        <Field {...field} {context}>
          <svelte:fragment slot="error" let:error>
            <slot name="error-field" {error}>
              {error}
            </slot>
          </svelte:fragment>
        </Field>
      {/each}
    </slot>
  </div>
  <button class={formStyles.submit} type="submit">
    <slot name="submit">Send message</slot>
  </button>
  <Errors show={showErrors} {context}>
    <svelte:fragment slot="error" let:error let:field>
      <slot name="error-list" {error} {field}>
        {`${field}: ${error}`}
      </slot>
    </svelte:fragment>
  </Errors>
</form> -->
