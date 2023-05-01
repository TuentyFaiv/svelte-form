<script lang="ts">
  import { getContext } from "svelte";

  import type { InputContext } from "$lib/logic/typing/globals/proptypes.js";
  import type { Props } from "./Errors.proptypes.js";

  export let context: Props["context"] = "form";
  export let showErrors: Props["showErrors"] = undefined;

  const form = getContext<InputContext>(context);
  const { errors, styles } = $form;

  $: show =
    showErrors && Object.values($errors).some((error) => error !== null);
</script>

{#if show}
  <ul class={styles?.errors?.list}>
    {#each Object.keys($errors) as error (error)}
      {#if $errors[error] !== null}
        <li class={styles.errors?.item}>
          {`${error}: ${$errors[error]}`}
        </li>
      {/if}
    {/each}
  </ul>
{/if}
