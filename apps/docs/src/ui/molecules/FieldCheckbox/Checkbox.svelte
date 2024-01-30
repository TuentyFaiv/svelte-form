<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    terms: {
      type: "boolean",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-checkbox";

  faivform({ fields: schema, context });
</script>

<Field
  name="terms"
  label="I accept the terms and conditions"
  type="checkbox"
  {context}
/>
