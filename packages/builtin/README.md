# Built-in Svelte forms
Build-in forms using [@tuentyfaiv/svelte-form](https://www.npmjs.com/package/@tuentyfaiv/svelte-form)

`npm install @tuentyfaiv/svelte-form @faivform/builtin`

## Imports
- ### Config 
  ```typescript
  import { setConfig, useGlobalFormStyles } from "@faivform/builtin";
  ```
- ### Build-in forms
  ```typescript
  // Forms components
  import {
    SigninForm,
    SignupForm,
    ContactForm,
  } from "@faivform/builtin";
  // Forms schemas
  import {
    fieldsSignin,
    fieldsSignup,
    fieldsContact,
  } from "@faivform/builtin";
  ```
- ### Utils
  ```typescript
  // Functions
  import { getTexts } from "@faivform/builtin";
  // Regex
  import {
    REGEX_NUMBERS,
    REGEX_PASSWORD,
    REGEX_PHONE,
    REGEX_PHONE_CODE,
  } from "@faivform/builtin";
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
  } from "@faivform/builtin";
  ```