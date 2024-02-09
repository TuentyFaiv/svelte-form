<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    age: {
      type: "number",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-number";

  faivform({ fields: schema, context });
</script>

<Field
  name="age"
  label="Age:"
  type="number"
  {context}
  placeholder="Enter your age"
/>
