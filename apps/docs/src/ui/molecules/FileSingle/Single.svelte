<script lang="ts">
  import { File, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    avatar: {
      type: "file",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "file-single";

  faivform({ fields: schema, context });
</script>

<File name="avatar" {context} />

<style>
  :global(div > label),
  :global(div > button) {
    margin-top: 0 !important;
  }
</style>
