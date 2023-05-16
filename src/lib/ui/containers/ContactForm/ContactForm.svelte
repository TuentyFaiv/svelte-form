<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { formStore } from "$lib/logic/stores/index.js";
  import { fieldsContact } from "$lib/logic/schemas/index.js";

  import type { Readable } from "svelte/store";
  import type { FormStyles } from "$lib/logic/typing/globals/proptypes.js";
  import type { Props } from "./ContactForm.proptypes.js";

  import * as stylesinternal from "./ContactForm.styles.js";

  import { Input, Errors } from "$lib/ui/components/index.js";

  export let submit: Props["submit"];
  export let phoneCode: Props["phoneCode"] = undefined;
  export let context: Props["context"] = undefined;
  export let ns: Props["ns"] = undefined;
  export let showErrors: Props["showErrors"] = undefined;
  export let styles: Props["styles"] = undefined;
  export let success: Props["success"] = undefined;

  const globalStyles = getContext<Readable<FormStyles>>("formStyles");
  $: formStyles = $globalStyles ?? styles?.form ?? stylesinternal ?? {};

  const store = formStore({
    fields: fieldsContact,
    ns,
    styles: {
      input: styles?.input ?? {},
      fileinput: styles?.fileinput ?? {},
      option: styles?.option ?? {},
      select: styles?.select ?? {},
      icons: styles?.icons ?? null,
    },
  });
  const { submit: onSubmit, setField, loading } = $store;
  const dispatch = createEventDispatcher<{
    error: unknown;
    finish: never;
  }>();

  const action = onSubmit(
    async (values) => {
      await submit(values);
    },
    {
      error(err) {
        dispatch("error", err);
      },
      finish() {
        setField("phoneCode", phoneCode);
        dispatch("finish");
      },
      context,
      success,
    }
  );

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
      <Input
        name="message"
        type="textarea"
        label="forms:message"
        placeholder="forms:message"
        {context}
      />
      <Input
        name="name"
        label="forms:name"
        placeholder="forms:name"
        {context}
      />
      <Input
        name="phone"
        type="tel"
        label="forms:tel"
        placeholder="forms:tel"
        {context}
      />
      <Input
        name="email"
        type="email"
        label="forms:email"
        placeholder="forms:email"
        {context}
      />
      <Input
        name="terms"
        type="checkbox"
        label="forms:terms"
        placeholder="forms:terms"
        {context}
      />
    </slot>
  </div>
  <button class={formStyles.submit} type="submit">
    <slot name="submit" />
  </button>
  <Errors show={showErrors} {context} />
</form>
