<script lang="ts">
  import { File, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    documents: {
      type: "array",
      required: true,
      item: {
        type: "file",
        required: true,
      },
    },
  } satisfies FieldsSchema;

  const context = "file-multiple-pdf";

  faivform({ fields: schema, context });
</script>

<File name="documents" {context} multiple accept=".pdf" />

<style>
  :global(div > label),
  :global(div > button) {
    margin-top: 0 !important;
  }
</style>
