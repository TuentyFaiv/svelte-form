<script lang="ts">
  import { File, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    document: {
      type: "file",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "file-single-pdf";

  faivform({ fields: schema, context });
</script>

<File name="document" {context} accept=".pdf" />

<style>
  :global(div > label),
  :global(div > button) {
    margin-top: 0 !important;
  }
</style>
