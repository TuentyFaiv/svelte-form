<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { formStore } from "$lib/logic/stores/index.js";
  import { fieldsContact } from "$lib/logic/schemas/index.js";

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
  const { submit, t: tf, setField } = $store;
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
    }
  );

  $: {
    if (phoneCode) {
      setField("phoneCode", phoneCode);
    }
  }
</script>

<form
  on:submit|preventDefault={action}
  class={styles?.form?.container ?? stylesinternal.container}
>
  <div class={styles?.form?.box ?? stylesinternal.box}>
    <slot>
      <Input
        name="message"
        type="textarea"
        label={tf("forms:message")}
        {context}
      />
      <Input name="name" label={tf("forms:name")} {context} />
      <Input name="phone" type="tel" label={tf("forms:tel")} {context} />
      <Input name="email" type="email" label={tf("forms:email")} {context} />
      <Input name="terms" type="checkbox" label={tf("forms:terms")} {context} />
    </slot>
  </div>
  <button class={styles?.form?.submit ?? stylesinternal.submit} type="submit">
    {tf("forms:submit-signin")}
  </button>
  <Errors show={showErrors} {context} />
</form>
