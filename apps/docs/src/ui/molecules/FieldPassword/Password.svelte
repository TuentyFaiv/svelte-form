<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    pass: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-password";

  faivform({ fields: schema, context });
</script>

<Field name="pass" label="Password:" type="password" {context} />
