# Svelte Form

`npm install @tuentyfaiv/svelte-form`

> Note: The Built-in forms was moved to [@tuentyfaiv/svelte-forms-ui](https://www.npmjs.com/package/@tuentyfaiv/svelte-form-ui)

## Examples

- ### Store creation
  ```typescript
  import { string } from "yup";
  import { faivform } from "@tuentyfaiv/svelte-form";

  const fields = {
    email: string().email("required-email").required("required"),
    // ...other fields
  };

  export const form = faivform({ fields });
  ```
- ### Input
  ```svelte
  <script lang="ts">
    import { Field } from "@tuentyfaiv/svelte-form";

    // From store created
    const { submit } = $form; // Store created
    // Or create a new one
    const form = faivform({ fields });
    const { submit } = $form;
    // If you want reactivity
    $: form = faivform({ fields });
    $: ({ submit } = $form);


    const onSubmit = submit(async (values) => {
      // ...action
    });
  </script>

  <form on:submit|preventDefault={onSubmit}>
    <Field name="email" type="email" label="Email" />
    // ... other inputs
    <button type="submit">Submit</button>
  </form>
  ```

## Imports
- ### Store 
  ```typescript
  import {
    faivform,
    useForm,
    setConfig
  } from "@tuentyfaiv/svelte-form";
  ```
- ### Components
  ```typescript
  import {
    Field,
    Select,
    Option,
    File,
    Errors
  } from "@tuentyfaiv/svelte-form";
  ```
- ### Utils
  ```typescript
  import { FormError } from "@tuentyfaiv/svelte-form";
  ```
- ### Types
  ```typescript
  import type {
    Config,
    ContextStyles,
    ContextForm,
    SelectOption,
    OptionItem,
    SharedUIProps,
    GeneralInputProps,
    GeneralFieldProps,
    FormStoreConfig,
    SubmitOptions,
    CssVars,
    ErrorsStyles,
    Icons,
    FileStyles,
    FieldStyles,
    OptionStyles,
    SelectStyles,
  } from "@tuentyfaiv/svelte-form";
  ```