<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { getTexts } from "$lib/logic/utils/objects.js";
  import { fieldsSignin } from "$lib/logic/schemas/index.js";
  import { formStore } from "$lib/logic/stores/index.js";

  import type { Readable } from "svelte/store";
  import type { FieldInputForm } from "$lib/logic/typing/globals/interfaces.js";
  import type { Config } from "$lib/logic/typing/stores/config.js";
  import type { Props, SigninFields } from "./SigninForm.proptypes.js";

  import * as stylesinternal from "./SigninForm.styles.js";

  import { Errors, Input } from "$lib/ui/components/index.js";

  export let submit: Props["submit"];
  export let context: Props["context"] = "form";
  export let showErrors: Props["showErrors"] = undefined;
  export let styles: Props["styles"] = undefined;
  export let success: Props["success"] = undefined;
  export let texts: Props["texts"];

  const globalStyles = getContext<Readable<Config["form"]>>("formStyles");
  $: formStyles = styles?.form ?? $globalStyles ?? stylesinternal ?? {};

  const store = formStore({
    fields: fieldsSignin,
    styles: {
      input: styles?.input ?? {},
      icons: styles?.icons ?? null,
    },
  });
  const { submit: onSubmit, loading } = $store;
  const dispatch = createEventDispatcher<{
    error: unknown;
    finish: undefined;
  }>();

  const action = onSubmit(submit, {
    error(err) {
      dispatch("error", err);
    },
    finish() {
      dispatch("finish");
    },
    context,
    success,
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
    ] satisfies FieldInputForm<SigninFields>[]
  ).map(getTexts(texts));
</script>

{#if $loading}
  <slot name="loading" />
{/if}

<form on:submit|preventDefault={action} class={formStyles.container}>
  <div class={formStyles.box}>
    <slot>
      {#each fields as field (field.name)}
        <Input {...field} {context}>
          <svelte:fragment slot="error" let:error>
            <slot name="error-field" {error}>
              {error}
            </slot>
          </svelte:fragment>
        </Input>
      {/each}
    </slot>
  </div>
  <button class={formStyles.submit} type="submit">
    <slot name="submit">Signin</slot>
  </button>
  <Errors show={showErrors} {context}>
    <svelte:fragment slot="error" let:error>
      <slot name="error-list" {error}>
        {error}
      </slot>
    </svelte:fragment>
  </Errors>
</form>
