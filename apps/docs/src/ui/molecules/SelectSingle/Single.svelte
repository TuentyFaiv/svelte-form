<script lang="ts">
  import { Select, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema, SelectOption } from "@tuentyfaiv/svelte-form";

  const schema = {
    tool: {
      type: "string",
      required: true,
    },
    // tool2: {
    //   type: "string",
    //   required: true,
    // },
  } satisfies FieldsSchema;

  const context = "select-single";

  // let parent: HTMLDivElement;

  faivform({ fields: schema, context });

  const options: SelectOption[] = [
    { value: "svelte", label: "Svelte" },
    { value: "faivform", label: "FaivForm" },
    { value: "astro", label: "Astro" },
    { value: "starlight", label: "Starlight" },
    { value: "vite", label: "Vite" },
    { value: "sveltekit", label: "SvelteKit" },
  ];
</script>

<Select
  name="tool"
  label="Tool:"
  placeholder="Choose a tool"
  {options}
  {context}
/>

<!-- <div class="box" bind:this={parent}>
  <div class="box__inner"></div>
  <Select
    name="tool2"
    label="Tool:"
    placeholder="Choose a tool"
    {parent}
    {options}
    {context}
  />
  <div class="box__inner"></div>
</div> -->

<style lang="postcss">
  :global(div > div),
  :global(div > div > button),
  :global(div > div > svg) {
    margin-top: 0 !important;
  }

  /* .box {
    @apply min-h-[200px] max-h-[500px] overflow-y-auto bg-gray-700;
    &__inner {
      @apply h-[400px] w-full;
    }
  } */
</style>
