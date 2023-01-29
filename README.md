# Svelte Forms

`npm install @tuentyfaiv/svelte-form`

## Examples

- ### Store creation
  ```typescript
  import * as Yup from "yup";
  import { formStore } from "@tuentyfaiv/svelte-form";

  import type { Fields } from "@tuentyfaiv/svelte-form";

  const fields: Fields = {
    email: Yup.string().email("required-email").required("required"),
    // ...other fields
  };

  export const form = formStore({ fields });
  ```
- ### Input
  ```svelte
  <script lang="ts">
    import { Input } from "@tuentyfaiv/svelte-form";

    const { submit } = $form; // Store created

    const onSubmit = submit((values) => {
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
    FileInput
  } from "@tuentyfaiv/svelte-form";
  ```
- ### Build-in forms
  ```typescript
  import {
    SigninForm,
    SignupForm
  } from "@tuentyfaiv/svelte-form";
  ```
- ### Types
  ```typescript
  import type {
    Fields,
    Data,
    SelectOption,
    SigninValues,
    SignupValues
  } from "@tuentyfaiv/svelte-form";
  ```