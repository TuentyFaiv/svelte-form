<script lang="ts">
  import { useForm } from "$lib/index.js";

  import type { Props } from "./Errors.proptypes.js";

  import * as stylesinternal from "./Errors.styles.js";

  export let context: Props["context"] = "form";
  export let show: Props["show"] = undefined;

  const form = useForm(context);
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
