<script lang="ts">
  import { useForm } from "$lib/index.js";

  import type { Props } from "./Errors.proptypes.js";

  export let context: Props["context"] = "form";
  export let show: Props["show"] = true;

  const form = useForm(context);
  const { errors, styles: cxtStyles } = $form;
  $: ({ errors: styles } = $cxtStyles);

  $: showErrors =
    show && Object.values($errors).some((error) => error !== null);

  $: list = Object.keys($errors).map((field) => ({
    field,
    error: $errors[field],
  }));
  $: externalStyles = styles?.list ? ` ${styles.list}` : "";
</script>

{#if showErrors}
  <ul class="list{externalStyles}">
    {#each list as { field, error }, index (`${field}-list-${index}`)}
      {#if error !== null}
        <li class={styles?.item ?? "item"}>
          <slot name="error" {error} {field}>
            {`${field}: ${error}`}
          </slot>
        </li>
      {/if}
    {/each}
  </ul>
{/if}

<style>
  .list {
    display: flex;
    box-sizing: border-box;
    margin: 16px 0 0;
    padding: 0;
    gap: 6px;
    list-style: none;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  .item {
    display: block;
    margin: 0;
    padding: 3px 5px;
    background-color: var(--s-form-error);
    border-radius: var(--s-form-radius);
    color: var(--s-form-text-error);
    font-size: 12px;
    line-height: 12px;
    font-family: system-ui, sans-serif;
  }
</style>
