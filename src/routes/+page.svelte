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
  on:submit={async ({ detail }) => {
    console.log(detail);
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
  on:submit={async ({ detail }) => {
    console.log(detail);
  }}
  on:choose={async ({ detail }) => {
    console.log(detail);
    detail.setField("phoneCode", "+52");
  }}
  showErrors
/>
<ContactForm
  on:submit={async ({ detail }) => {
    console.log(detail);
  }}
  showErrors
>
  asdasdas contact
</ContactForm>
