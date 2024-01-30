<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    contact: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-email";

  faivform({ fields: schema, context });
</script>

<Field
  name="contact"
  label="Email:"
  type="email"
  {context}
  placeholder="user@email.com"
/>
