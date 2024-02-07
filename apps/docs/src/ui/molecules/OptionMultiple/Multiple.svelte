<script lang="ts">
  import { Option, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema, OptionItem } from "@tuentyfaiv/svelte-form";

  const schema = {
    hobbies: {
      type: "array",
      required: true,
      max: 3,
      item: {
        type: "string",
        required: true,
      },
    },
  } satisfies FieldsSchema;

  const context = "option-multiple";

  faivform({ fields: schema, context });

  const options: OptionItem[] = [
    { value: "swimming", label: "Swimming" },
    { value: "reading", label: "Reading" },
    { value: "running", label: "Running" },
    { value: "cycling", label: "Cycling" },
    { value: "gaming", label: "Gaming" },
    { value: "cooking", label: "Cooking" },
  ];
</script>

<Option
  name="hobbies"
  label="Select your hobbies:"
  {options}
  {context}
  multiple
/>

<style>
  :global(fieldset > label) {
    margin-top: 0 !important;
  }
</style>
