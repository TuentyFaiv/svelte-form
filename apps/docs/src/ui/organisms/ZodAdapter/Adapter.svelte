<script lang="ts">
  import { Errors, faivform, Field } from "@tuentyfaiv/svelte-form";
  import { adapter } from "@faivform/zod";
  import { z } from "zod";

  const schema = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
    // details: z.object({
    //   address: z.string(),
    //   city: z.string(),
    //   postalCode: z.string(),
    // }),
  });

  type Schema = typeof schema;
  type Fields = z.infer<Schema>;

  const context = "adapter-zod";

  const form = faivform<Schema, Fields>({
    fields: adapter(schema),
    context,
  });

  const { submit } = $form;

  const onSubmit = submit((values) => {
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
