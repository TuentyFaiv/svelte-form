<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { formStore } from "$lib/logic/stores/index.js";
  import { fieldsContact } from "$lib/logic/schemas/index.js";

  import type { Readable } from "svelte/store";
  import type { FormStyles } from "$lib/logic/typing/globals/proptypes.js";
  import type { ContactValues } from "$lib/logic/typing/schemas/contact.js";
  import type { Props } from "./ContactForm.proptypes.js";

  import * as stylesinternal from "./ContactForm.styles.js";

  import { Input, Errors } from "$lib/ui/components/index.js";

  export let phoneCode: Props["phoneCode"] = undefined;
  export let context: Props["context"] = undefined;
  export let ns: Props["ns"] = undefined;
  export let showErrors: Props["showErrors"] = undefined;
  export let t: Props["t"] = undefined;
  export let styles: Props["styles"] = undefined;
  export let success: Props["success"] = undefined;

  const globalStyles = getContext<Readable<FormStyles>>("formStyles");
  $: formStyles = $globalStyles ?? styles?.form ?? stylesinternal ?? {};

  const store = formStore({
    fields: fieldsContact,
    ns,
    t,
    styles: {
      input: styles?.input ?? {},
      fileinput: styles?.fileinput ?? {},
      option: styles?.option ?? {},
      select: styles?.select ?? {},
      icons: styles?.icons ?? null,
    },
  });
  const { submit, t: tf, setField, loading } = $store;
  const dispatch = createEventDispatcher<{
    submit: ContactValues;
    error: unknown;
    finish: never;
  }>();

  const action = submit(
    async (values) => {
      await dispatch("submit", values);
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
        label={tf("forms:message")}
        placeholder={tf("forms:message")}
        {context}
      />
      <Input
        name="name"
        label={tf("forms:name")}
        placeholder={tf("forms:name")}
        {context}
      />
      <Input
        name="phone"
        type="tel"
        label={tf("forms:tel")}
        placeholder={tf("forms:tel")}
        {context}
      />
      <Input
        name="email"
        type="email"
        label={tf("forms:email")}
        placeholder={tf("forms:email")}
        {context}
      />
      <Input
        name="terms"
        type="checkbox"
        label={tf("forms:terms")}
        placeholder={tf("forms:terms")}
        {context}
      />
    </slot>
  </div>
  <button class={formStyles.submit} type="submit">
    {tf("forms:submit-signin")}
  </button>
  <Errors show={showErrors} {context} />
</form>
