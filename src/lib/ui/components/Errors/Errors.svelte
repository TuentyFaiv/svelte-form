<script lang="ts">
  import { getContext } from "svelte";

  import type { InputContext } from "$lib/logic/typing/globals/proptypes.js";
  import type { Props } from "./Errors.proptypes.js";

  import * as stylesinternal from "./Errors.styles.js";

  export let context: Props["context"] = "form";
  export let show: Props["show"] = undefined;

  const form = getContext<InputContext>(context);
  const { errors, styles: cxtStyles } = $form;
  $: ({ errors: styles } = $cxtStyles);

  $: showErrors =
    show && Object.values($errors).some((error) => error !== null);

  $: list = Object.keys($errors).map((field) => ({
    field,
    error: $errors[field],
  }));
</script>

{#if showErrors}
  <ul class={styles?.list ?? stylesinternal.list}>
    {#each list as { field, error }, index (`${field}-list-${index}`)}
      {#if error !== null}
        <li class={styles?.item ?? stylesinternal.item}>
          <slot name="error" {error} {field}>
            {`${field}: ${error}`}
          </slot>
        </li>
      {/if}
    {/each}
  </ul>
{/if}
