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

  const context = "select-multiple";

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
  name="tools"
  label="Tools:"
  placeholder="Choose tools"
  {options}
  {context}
  multiple
/>

<style>
  :global(div > div),
  :global(div > div > button),
  :global(div > div > svg) {
    margin-top: 0 !important;
  }
</style>
