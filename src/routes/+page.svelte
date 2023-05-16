<script lang="ts">
  import {
    ContactForm,
    Errors,
    FileInput,
    Option,
    SigninForm,
    SignupForm,
  } from "../lib/index.js";
</script>

<SigninForm
  submit={async (values) => {
    console.log(values);
  }}
  showErrors
/>
<SignupForm
  confirm={false}
  options={[
    {
      label: "Colombia",
      value: "CO",
    },
    {
      label: "Mexico",
      value: "MX",
    },
  ]}
  submit={async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    throw new Error("custom-error");
  }}
  on:choose={async ({ detail }) => {
    console.log(detail);
    detail.setField("phoneCode", "+52");
  }}
  on:finish={() => {
    console.log("finish");
  }}
  on:error={({ detail }) => {
    console.log(detail);
  }}
  showErrors
>
  <p slot="loading">Loading...</p>
</SignupForm>
<ContactForm
  submit={async (values) => {
    console.log(values);
  }}
  showErrors
>
  asdasdas contact
</ContactForm>
