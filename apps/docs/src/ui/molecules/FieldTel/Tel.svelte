<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    phone: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-tel";

  faivform({ fields: schema, context });
</script>

<Field
  name="phone"
  label="Phone:"
  type="tel"
  {context}
  placeholder="Enter your phone number"
/>
