<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    looking: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-search";

  faivform({ fields: schema, context });
</script>

<Field
  name="looking"
  label="Search:"
  type="search"
  {context}
  placeholder="What are you looking for?"
/>
