<script lang="ts">
  import { File, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    covers: {
      type: "array",
      required: true,
      item: {
        type: "file",
        required: true,
      },
    },
  } satisfies FieldsSchema;

  const context = "file-multiple";

  faivform({ fields: schema, context });
</script>

<File name="covers" {context} multiple />

<style>
  :global(div > label),
  :global(div > button),
  :global(div > div) {
    margin-top: 0 !important;
  }

  :global(div > img) {
    height: 100%;
  }
</style>
