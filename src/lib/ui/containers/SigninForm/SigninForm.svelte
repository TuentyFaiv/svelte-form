<script lang="ts">
  import { formStore } from "$lib/logic/stores";
  import { fieldsSignin } from "$lib/logic/schemas";

  import type { Props } from "./SigninForm.proptypes";

  import * as stylesinternal from "./SigninForm.styles";

  import { Errors, Input } from "$lib/ui/components";

  export let onSubmit: Props["onSubmit"];
  export let onError: Props["onError"] = undefined;
  export let onFinish: Props["onFinish"] = undefined;
  export let context: Props["context"] = undefined;
  export let showErrors: Props["showErrors"] = undefined;
  export let ns: Props["ns"] = undefined;
  export let t: Props["t"] = undefined;
  export let styles: Props["styles"] = undefined;

  const store = formStore({
    fields: fieldsSignin,
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
      <Input name="email" type="email" label={tf("forms:email")} {context} />
      <Input
        name="password"
        type="password"
        label={tf("forms:password")}
        {context}
      />
    </slot>
  </div>
  <button class={styles?.form?.submit ?? stylesinternal.submit} type="submit">
    {tf("forms:submit-signin")}
  </button>
  <Errors {showErrors} {context} />
</form>
