<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    description: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-description";

  faivform({ fields: schema, context });
</script>

<Field
  name="description"
  label="Description:"
  type="textarea"
  placeholder="Enter a description"
  {context}
/>

<style>
  :global(label > textarea) {
    margin-top: 0 !important;
  }
</style>
