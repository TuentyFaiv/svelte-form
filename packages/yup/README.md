# Faivform zod adapter

This package provides a yup adapter for [faivform](https://www.npmjs.com/package/@tuentyfaiv/svelte-form)

You can check the [documentation](https://forms.tuentyfaiv.com/adapters/yup/) for more information.

## Installation

```bash
npm install @faivform/yup
```

## Basic example

```svelte
<script lang="ts">
  import { Field } from "@tuentyfaiv/svelte-form";
  import { adapter } from "@faivform/yup";
  import { signinSchema } from "./your-schema/path";

  const form = faivform({ fields: adapter(signinSchema) });
  const { submit } = $form;
  
  // or

  $: form = faivform({ fields: adapter(signinSchema) });
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
