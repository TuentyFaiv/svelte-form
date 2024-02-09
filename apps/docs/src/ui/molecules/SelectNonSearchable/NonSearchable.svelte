<script lang="ts">
  import { Select, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema, SelectOption } from "@tuentyfaiv/svelte-form";

  const schema = {
    tool: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "select-non-searchable";

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
  searchable={false}
/>

<style>
  :global(div > div),
  :global(div > div > button),
  :global(div > div > svg) {
    margin-top: 0 !important;
  }
</style>
