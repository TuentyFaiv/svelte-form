<script lang="ts">
  import {
    Field,
    Select,
    File,
    Option,
    Errors,
    faivform,
  } from "@tuentyfaiv/svelte-form";

  import type {
    FieldsSchema,
    OptionItem,
    SelectOption,
  } from "@tuentyfaiv/svelte-form";

  const schema = {
    username: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    avatar: "file",
    details: {
      type: "string",
      required: true,
      max: 500,
    },
    permissions: {
      type: "array",
      required: true,
      min: 2,
      item: {
        type: "string",
        required: true,
      },
    },
    categories: {
      type: "array",
      required: true,
      min: 3,
      item: {
        type: "string",
        required: true,
      },
    },
  } satisfies FieldsSchema;

  const context = "errors";

  faivform({ fields: schema, context });

  const permissions: SelectOption[] = [
    { value: "read", label: "Read" },
    { value: "write", label: "Write" },
    { value: "delete", label: "Delete" },
  ];

  const categories: OptionItem[] = [
    { value: "news", label: "News" },
    { value: "sports", label: "Sports" },
    { value: "technology", label: "Technology" },
    { value: "entertainment", label: "Entertainment" },
    { value: "lifestyle", label: "Lifestyle" },
  ];
</script>

<Field label="Username:" name="username" {context}>
  <svelte:fragment slot="error">Username is required</svelte:fragment>
</Field>

<Field label="Email:" name="email" type="email" {context}>
  <svelte:fragment slot="error">Email is required</svelte:fragment>
</Field>

<File name="avatar" {context}>
  <svelte:fragment slot="error">Avatar is required</svelte:fragment>
</File>

<Field label="Details:" name="details" type="textarea" {context}>
  <svelte:fragment slot="error">Details is required</svelte:fragment>
</Field>

<Select
  label="Permissions:"
  name="permissions"
  options={permissions}
  {context}
  multiple
>
  <svelte:fragment slot="error">Choose at least 2 permission</svelte:fragment>
</Select>

<Option
  label="Categories:"
  name="categories"
  options={categories}
  {context}
  multiple
>
  <svelte:fragment slot="error">Choose at least 3 categories</svelte:fragment>
</Option>

<Errors {context} />

<style>
  :global(small) {
    margin-top: 0 !important;
    color: var(--faivform-placeholder-text);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-placeholder-font);
  }
</style>
