<script lang="ts">
  import { formStore } from "$lib/logic/stores";
  import { fieldsContact } from "$lib/logic/schemas";

  import type { Props } from "./ContactForm.proptypes";

  import * as stylesinternal from "./ContactForm.styles";

  import { Input } from "$lib/ui/components";

  export let onSubmit: Props["onSubmit"];
  export let onError: Props["onError"] = undefined;
  export let onFinish: Props["onFinish"] = undefined;
  export let context: Props["context"] = undefined;
  export let ns: Props["ns"] = undefined;
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
  const { submit, t: tf } = $store;

  const action = submit(onSubmit, {
    error: onError,
    finish: onFinish,
    contextns: context,
  });
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
    </slot>
  </div>
  <button class={styles?.form?.submit ?? stylesinternal.submit} type="submit">
    {tf("forms:submit-signin")}
  </button>
</form>
