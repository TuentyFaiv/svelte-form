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

  $: list = Object.values($errors).map((error) => error);
</script>

{#if showErrors}
  <ul class={styles?.list ?? stylesinternal.list}>
    {#each list as error, index (`${error}-list-${index}`)}
      {#if error !== null}
        <li class={styles?.item ?? stylesinternal.item}>
          <slot name="error" {error}>
            {`${error}: ${t(`${$errors[error]}`)}`}
          </slot>
        </li>
      {/if}
    {/each}
  </ul>
{/if}
