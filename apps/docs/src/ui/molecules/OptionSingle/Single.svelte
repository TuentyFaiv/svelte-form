<script lang="ts">
  import { Option, faivform } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema, OptionItem } from "@tuentyfaiv/svelte-form";

  const schema = {
    hobby: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const context = "option-single";

  faivform({ fields: schema, context });

  const options: OptionItem[] = [
    { value: "swimming", label: "Swimming" },
    { value: "reading", label: "Reading" },
    { value: "running", label: "Running" },
    { value: "cycling", label: "Cycling" },
    { value: "gaming", label: "Gaming" },
    { value: "cooking", label: "Cooking" },
  ];
</script>

<Option name="hobby" label="Select your hobby:" {options} {context} />

<style>
  :global(fieldset > label) {
    margin-top: 0 !important;
  }
</style>
