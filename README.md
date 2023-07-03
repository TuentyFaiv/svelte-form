# Svelte Form

`npm install @tuentyfaiv/svelte-form`

## Examples

- ### Store creation
  ```typescript
  import { string } from "yup";
  import { formStore } from "@tuentyfaiv/svelte-form";

  const fields = {
    email: string().email("required-email").required("required"),
    // ...other fields
  };

  export const form = formStore({ fields });
  ```
- ### Input
  ```svelte
  <script lang="ts">
    import { Field } from "@tuentyfaiv/svelte-form";

    // From store created
    const { submit } = $form; // Store created
    // Or create a new one
    const form = formStore({ fields });
    const { submit } = $form;
    // If you want reactivity
    $: form = formStore({ fields });
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
  import { formStore, setConfig } from "@tuentyfaiv/svelte-form";
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
- ### Build-in forms
  ```typescript
  // Forms components
  import {
    SigninForm,
    SignupForm,
    ContactForm,
  } from "@tuentyfaiv/svelte-form";
  // Forms schemas
  import {
    fieldsSignin,
    fieldsSignup,
    fieldsContact,
  } from "@tuentyfaiv/svelte-form";
  ```
- ### Utils
  ```typescript
  import { FormError } from "@tuentyfaiv/svelte-form";
  ```
- ### Types
  ```typescript
  import type {
    ContextStyles,
    ContextForm,
    FormStoreConfig,
    Config,
    SelectOption,
    TextsProp,
    SigninValues,
    SignupValues,
    ContactValues,
    SharedFormStyles,
    CssVars,
    ErrorsStyles,
    Icons,
    FileStyles,
    FieldStyles,
    OptionStyles,
    SelectStyles,
  } from "@tuentyfaiv/svelte-form";
  ```