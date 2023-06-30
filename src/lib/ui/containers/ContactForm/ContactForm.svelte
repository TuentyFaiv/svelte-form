<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import { formStore } from "$lib/logic/stores/index.js";
  import { fieldsContact } from "$lib/logic/schemas/index.js";

  import type { Readable } from "svelte/store";
  import type { Config } from "$lib/logic/typing/stores/config.js";
  import type { Props } from "./ContactForm.proptypes.js";

  import * as stylesinternal from "./ContactForm.styles.js";

  import { Input, Errors } from "$lib/ui/components/index.js";

  export let submit: Props["submit"];
  export let phoneCode: Props["phoneCode"] = undefined;
  export let context: Props["context"] = "form";
  export let ns: Props["ns"] = undefined;
  export let showErrors: Props["showErrors"] = undefined;
  export let styles: Props["styles"] = undefined;
  export let success: Props["success"] = undefined;
  export let texts: Props["texts"];
  export let t: Props["t"] = (msg) => msg;

  const globalStyles = getContext<Readable<Config["form"]>>("formStyles");
  $: formStyles = styles?.form ?? $globalStyles ?? stylesinternal ?? {};

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
    success,
  });

  $: fields = (
    [
      {
        name: "message",
        type: "textarea",
      },
      {
        name: "name",
        type: "text",
      },
      {
        name: "phone",
        type: "tel",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "terms",
        type: "checkbox",
      },
    ] as const
  ).map((field) => {
    type TextObj = Exclude<Props["texts"]["email"], string>;
    const sharedText = typeof texts[field.name] === "string";
    return {
      ...field,
      label: sharedText
        ? (texts[field.name] as string)
        : (texts[field.name] as TextObj).label,
      placeholder: sharedText
        ? (texts[field.name] as string)
        : (texts[field.name] as TextObj).placeholder,
    };
  });

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
        <Input {...field} {context} {t}>
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
    <slot name="submit" />
  </button>
  <Errors show={showErrors} {context} {t}>
    <svelte:fragment slot="error" let:error>
      <slot name="error-list" {error}>
        {error}
      </slot>
    </svelte:fragment>
  </Errors>
</form>
