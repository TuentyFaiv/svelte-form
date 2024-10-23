<script lang="ts">
  import { fade } from "svelte/transition";
  import { useForm } from "$lib/index.js";
  import { getStyles } from "$lib/logic/utils/styles.js";

  import type { Props } from "./Errors.proptypes.js";

  import "./Errors.css";

  type $$Props = Props;

  export let context: Props["context"] = "form";
  export let id: Props["id"] = null;
  export let styles: Props["styles"] = {};

  $: form = useForm(context);
  $: ({ errors, styles: ctxStyles } = $form);
  $: ({ errors: ctxErrorStyles, replace } = $ctxStyles);

  $: show = Object.values($errors).some((error) => error !== null);

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "svorm-errors-container",
      item: "svorm-errors-item",
    },
    externals: {
      container: styles?.container ?? ctxErrorStyles?.container,
      item: styles?.item ?? ctxErrorStyles?.item,
    },
  });
</script>

{#key form}
  {#if show}
    <ul class={styls.container} {id}>
      {#each Object.entries($errors) as [field, error], index (`${field}-list-${index}`)}
        {#if error !== null}
          <li class={styls.item} transition:fade={{ duration: 200 }}>
            <slot {error} {field}>
              {`${field}: ${error}`}
            </slot>
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
{/key}
