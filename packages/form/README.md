# Faivform

A form library for Svelte. It is built on top of Svelte and Typescript. Inspired by Formik and React Hook Form.

You can check the [documentation](https://forms.tuentyfaiv.com) for more information.

## Installation

`npm install @tuentyfaiv/svelte-form`

## Basic example

- ### Schema
  ```typescript
  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  export const signinSchema: = {
    email: "string",
    password: "string",
    // ...other fields
  } satisfies FieldsSchema;
  ```
- ### Form
  ```typescript
  <script lang="ts">
    import { Field } from "@tuentyfaiv/svelte-form";
    import { signinSchema } from "./your-schema/path";

    const form = faivform({ fields: signinSchema });
    const { submit } = $form;
    
    // or

    $: form = faivform({ fields: signinSchema });
    $: ({ submit } = $form);


    const onSubmit = submit(async (values) => {
      // your logic
    });
  </script>

  <form on:submit|preventDefault={onSubmit}>
    <Field name="email" type="email" label="Email" />
    <Field name="password" type="password" label="Password" />
    // ... other inputs
    <button type="submit">Submit</button>
  </form>
  ```
