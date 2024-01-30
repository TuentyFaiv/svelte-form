<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    name: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "field-text";

  faivform({ fields: schema, context });
</script>

<Field name="name" label="Name:" {context} placeholder="Enter your name" />
