<script lang="ts">
  import { getContext } from "svelte";

  import type { InputContext } from "$lib/logic/typing/globals/proptypes.js";
  import type { Props } from "./Errors.proptypes.js";

  import * as stylesinternal from "./Errors.styles.js";

  export let context: Props["context"] = "form";
  export let show: Props["show"] = undefined;
  export let t: Props["t"] = (msg) => msg;

  const form = getContext<InputContext>(context);
  const { errors, styles: cxtStyles } = $form;
  $: ({ errors: styles } = $cxtStyles);

  $: showErrors =
    show && Object.values($errors).some((error) => error !== null);
</script>

{#if showErrors}
  <ul class={styles?.list ?? stylesinternal.list}>
    {#each Object.keys($errors) as error (error)}
      {#if $errors[error] !== null}
        <li class={styles?.item ?? stylesinternal.item}>
          {`${error}: ${t(`${$errors[error]}`)}`}
        </li>
      {/if}
    {/each}
  </ul>
{/if}
