<script lang="ts">
  export let src: string | undefined;
  export let alt: string | undefined;
  export let style: string | undefined;
  export let component: any;

  export let element: HTMLImageElement | null = null;
</script>

{#if src}
  <img
    class={style}
    {src}
    {alt}
    bind:this={element}
    decoding="async"
    loading="lazy"
    role="presentation"
  />
{:else if component}
  <svelte:component this={component} className={style} />
{/if}
