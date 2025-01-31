<script lang="ts">
  import { Select, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema, SelectOption } from "@tuentyfaiv/svelte-form";

  const schema = {
    tools: {
      type: "array",
      required: true,
      item: {
        type: "string",
        required: true,
      },
    },
  } satisfies FieldsSchema;

  const context = "select-non-searchable-multiple";

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
  id="tools-non-searchable-multiple"
  name="tools"
  label="Tools:"
  placeholder="Choose tools"
  {options}
  {context}
  multiple
  searchable={false}
/>

<style>
  :global(label > div),
  :global(label > div > button),
  :global(label > div > ul),
  :global(label > div > ul > li) {
    margin-top: 0 !important;
  }

  :global(li > svg) {
    margin-bottom: 0 !important;
  }
</style>
