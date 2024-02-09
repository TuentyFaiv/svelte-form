<script lang="ts">
  import { faivform, Field, Errors } from "@tuentyfaiv/svelte-form";

  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  const schema = {
    name: /^[a-zA-Z]+$/,
    message: "string",
    accept: {
      type: "boolean",
      required: true,
    },
  } satisfies FieldsSchema;

  const form = faivform({ fields: schema });

  const { data, errors, loading, submit } = $form;

  const onSubmit = submit(async (values) => {
    alert(JSON.stringify(values, null, 2));
  });

  const schemaString = Object.keys(schema).reduce(
    (acc, key) => {
      const item = key as keyof typeof schema;
      return {
        ...acc,
        [item]:
          schema[item] instanceof RegExp
            ? (schema[item] as RegExp).source
            : schema[item],
      };
    },
    {} as typeof schema,
  );
</script>

<div class="usage-example">
  <div class="usage-example__internal">
    <pre class="usage-example__code">
      <p>Schema</p>
      <code>{JSON.stringify(schemaString, null, 2)}</code>
    </pre>
    <pre class="usage-example__code">
      <p>Data</p>
      <code>{JSON.stringify($data, null, 2)}</code>
    </pre>
    <pre class="usage-example__code">
      <p>Errors</p>
      <code>{JSON.stringify($errors, null, 2)}</code>
    </pre>
  </div>
  <form on:submit|preventDefault={onSubmit} class="usage-example__form">
    <Field name="name" label="Name:" />
    <Field name="message" label="Leave a message:" type="textarea" />
    <Field name="accept" label="Accept terms:" type="checkbox" />
    <button type="submit">
      {$loading ? "Loading..." : "Submit"}
    </button>
  </form>
  <Errors />
</div>

<style>
  .usage-example {
    @apply w-full flex justify-center items-center flex-col gap-5;
  }
  .usage-example__internal {
    @apply w-full flex justify-center items-center gap-4 flex-wrap;
  }
  .usage-example__code {
    @apply flex flex-col w-full max-h-max mt-0 overflow-x-auto;
    --code-background: var(--ec-frm-edBg);
    background: var(--code-background);
  }
  .usage-example__code:first-of-type {
    @apply mt-8;
  }
  .usage-example__code > p {
    @apply w-full mb-4;
  }
  .usage-example__code > code {
    @apply w-full block min-w-[220px];
  }
  .usage-example__form {
    @apply w-full;
  }

  @media screen and (min-width: 640px) {
    .usage-example__code:not(:first-of-type) {
      @apply flex-1;
    }
  }
</style>
