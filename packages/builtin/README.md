# Svelte Form UI
Build-in forms for Svelte using [@tuentyfaiv/svelte-form](https://www.npmjs.com/package/@tuentyfaiv/svelte-form)
`npm install @tuentyfaiv/svelte-form-ui @tuentyfaiv/svelte-form`

## Imports
- ### Config 
  ```typescript
  import { setConfig, useGlobalFormStyles } from "@tuentyfaiv/svelte-form-ui";
  ```
- ### Build-in forms
  ```typescript
  // Forms components
  import {
    SigninForm,
    SignupForm,
    ContactForm,
  } from "@tuentyfaiv/svelte-form-ui";
  // Forms schemas
  import {
    fieldsSignin,
    fieldsSignup,
    fieldsContact,
  } from "@tuentyfaiv/svelte-form-ui";
  ```
- ### Utils
  ```typescript
  // Functions
  import { getTexts } from "@tuentyfaiv/svelte-form-ui";
  // Regex
  import {
    REGEX_NUMBERS,
    REGEX_PASSWORD,
    REGEX_PHONE,
    REGEX_PHONE_CODE,
  } from "@tuentyfaiv/svelte-form-ui";
  ```
- ### Types
  ```typescript
  import type {
    ConfigForm,
    FieldInputForm,
    FormStyles,
    GlobalFormProps,
    TextsProp,
    SigninValues,
    SignupValues,
    ContactValues,
  } from "@tuentyfaiv/svelte-form-ui";
  ```