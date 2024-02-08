<script lang="ts">
  import { File, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    profile: {
      type: "file",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "file-multiple";

  faivform({ fields: schema, context });
</script>

<File name="profile" {context} disabled />

<style>
  :global(div > label),
  :global(div > button) {
    margin-top: 0 !important;
  }
</style>
