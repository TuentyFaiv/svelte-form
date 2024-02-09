<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    website: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-url";

  faivform({ fields: schema, context });
</script>

<Field
  name="website"
  label="Website:"
  type="url"
  {context}
  placeholder="https://www.example.com"
/>
