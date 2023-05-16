<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { formStore } from "$lib/logic/stores/index.js";
  import { fieldsSignin } from "$lib/logic/schemas/index.js";

  import type { Readable } from "svelte/store";
  import type { FormStyles } from "$lib/logic/typing/globals/proptypes.js";
  import type { Props } from "./SigninForm.proptypes.js";

  import * as stylesinternal from "./SigninForm.styles.js";

  import { Errors, Input } from "$lib/ui/components/index.js";

  export let submit: Props["submit"];
  export let context: Props["context"] = undefined;
  export let showErrors: Props["showErrors"] = undefined;
  export let ns: Props["ns"] = undefined;
  export let t: Props["t"] = undefined;
  export let styles: Props["styles"] = undefined;
  export let success: Props["success"] = undefined;

  const globalStyles = getContext<Readable<FormStyles>>("formStyles");
  $: formStyles = $globalStyles ?? styles?.form ?? stylesinternal ?? {};

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
  const { submit: onSubmit, t: tf, loading } = $store;
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
        dispatch("finish");
      },
      context,
      success,
    }
  );
</script>

{#if $loading}
  <slot name="loading" />
{/if}

<form on:submit|preventDefault={action} class={formStyles.container}>
  <div class={formStyles.box}>
    <slot>
      <Input
        name="email"
        type="email"
        label={tf("forms:email")}
        placeholder={tf("forms:email")}
        {context}
      />
      <Input
        name="password"
        type="password"
        label={tf("forms:password")}
        placeholder={tf("forms:password")}
        {context}
      />
    </slot>
  </div>
  <button class={formStyles.submit} type="submit">
    {tf("forms:submit-signin")}
  </button>
  <Errors show={showErrors} {context} />
</form>
