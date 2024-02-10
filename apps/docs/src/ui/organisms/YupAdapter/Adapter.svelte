<script lang="ts">
  import { Errors, faivform, Field } from "@tuentyfaiv/svelte-form";
  import { adapter } from "@faivform/yup";
  import { object, string, number } from "yup";

  import type { InferType } from "yup";

  const schema = object({
    name: string().required("Name is required"),
    age: number()
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    email: string().email().required("Email is required"),
    // details: object({
    //   address: string(),
    //   city: string(),
    //   postalCode: string(),
    // }),
  });

  type Schema = typeof schema;
  type Fields = InferType<Schema>;

  const context = "adapter-yup";

  const form = faivform<Schema, Fields>({
    fields: adapter(schema),
    context,
  });

  const onSubmit = $form.submit((values) => {
    console.log(values);
  });
</script>

<form on:submit|preventDefault={onSubmit}>
  <Field name="name" label="Name:" {context} />

  <Field name="age" label="Age:" type="number" {context} />

  <Field name="email" label="Email:" type="email" {context} />

  <!-- <Field name="details.address" label="Address:" {context} />

  <Field name="details.city" label="City:" {context} />

  <Field name="details.postalCode" label="Postal Code:" {context} /> -->

  <Errors {context} />

  <button type="submit"> Submit </button>
</form>
