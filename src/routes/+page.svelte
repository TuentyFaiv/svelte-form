<script lang="ts">
  import {
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
  on:submit={async ({ detail }) => {
    console.log(detail);
  }}
  showErrors
/>
