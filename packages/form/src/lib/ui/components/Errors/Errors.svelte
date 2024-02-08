<script lang="ts">
  import { fade } from "svelte/transition";
  import { useForm } from "$lib/index.js";
  import { getStyles } from "$lib/logic/utils/styles.js";

  import type { Props } from "./Errors.proptypes.js";

  type $$Props = Props;

  export let context: Props["context"] = "form";
  export let id: Props["id"] = null;
  export let styles: Props["styles"] = {};
  export let datas: Props["datas"] = {};

  $: form = useForm(context);
  $: ({ errors, styles: ctxStyles } = $form);
  $: ({ errors: ctxErrorStyles, replace } = $ctxStyles);

  $: show = Object.values($errors).some((error) => error !== null);

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "faivform-errors-container",
      item: "faivform-errors-item",
    },
    externals: {
      container: styles?.container ?? ctxErrorStyles?.container,
      item: styles?.item ?? ctxErrorStyles?.item,
    },
  });
</script>

{#if show}
  <ul class={styls.container} {...datas} {id}>
    {#each Object.entries($errors) as [field, error], index (`${field}-list-${index}`)}
      <slot {error} {field}>
        {#if error !== null}
          <li class={styls.item} transition:fade={{ duration: 200 }}>
            {`${field}: ${error}`}
          </li>
        {/if}
      </slot>
    {/each}
  </ul>
{/if}

<style>
  :global(.faivform-errors-container) {
    box-sizing: border-box;
    display: flex;
    margin: var(--faivform-space) 0 0;
    padding: 0;
    gap: calc(var(--faivform-space) / 4);
    list-style: none;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  :global(.faivform-errors-item) {
    box-sizing: inherit;
    display: block;
    width: 100%;
    margin: 0;
    padding: calc(var(--faivform-space) / 2) calc(var(--faivform-space) / 1.5);
    background-color: var(--faivform-error-color);
    color: var(--faivform-error-text);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-placeholder-font);
    border-radius: var(--faivform-radius);
  }
</style>
