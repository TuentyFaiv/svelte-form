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
    import { Input } from "@tuentyfaiv/svelte-form";

    const { submit } = $form; // Store created

    const onSubmit = submit(async (values) => {
      // ...action
    });
  </script>

  <form on:submit|preventDefault={onSubmit}>
    <Input name="email" type="email" label={"forms:email"} />
    // ... other inputs
    <button type="submit">Submit</button>
  </form>
  ```

## Imports
- ### Store 
  ```typescript
  import { formStore } from "@tuentyfaiv/svelte-form";
  ```
- ### Components
  ```typescript
  import {
    Input,
    Select,
    FileInput,
    Option,
    Errors
  } from "@tuentyfaiv/svelte-form";
  ```
- ### Build-in forms
  ```typescript
  import {
    SigninForm,
    SignupForm,
    ContactForm
  } from "@tuentyfaiv/svelte-form";
  ```
- ### Types
  ```typescript
  import type {
    SelectOption,
    SigninValues,
    SignupValues,
    ContactValues,
    FormStyles,
    StoreStyles
  } from "@tuentyfaiv/svelte-form";
  ```