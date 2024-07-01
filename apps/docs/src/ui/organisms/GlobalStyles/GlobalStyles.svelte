<script lang="ts">
  import {
    faivform,
    Field,
    setConfig,
    type FieldsSchema,
  } from "@tuentyfaiv/svelte-form";

  setConfig({
    fields: {
      field: {
        container: "field__container",
        label: "field__label",
        input: "field__input",
      },
    },
  });

  const fields = {
    name: {
      type: "string",
      required: true,
    },
  } satisfies FieldsSchema;

  const globalContext = "global";
  const formContext = "form";

  const globalForm = faivform({
    fields,
    context: globalContext,
  });
  const form = faivform({
    fields,
    styles: {
      field: {
        container: "form-field__container",
        label: "form-field__label",
        input: "form-field__input",
      },
    },
    context: formContext,
  });

  const onSubmit = $globalForm.submit(async (values) => {
    console.log(values);
  });
  const onFormSubmit = $form.submit(async (values) => {
    console.log(values);
  });
</script>

<form on:submit|preventDefault={onSubmit}>
  <Field name="name" label="Name:" context={globalContext} />
</form>

<form on:submit|preventDefault={onFormSubmit}>
  <Field name="name" label="Name:" context={formContext} />
</form>
