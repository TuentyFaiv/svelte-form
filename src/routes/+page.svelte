<script lang="ts">
  import { Errors, SigninForm, SignupForm } from "../lib/index.js";
</script>

<SigninForm
  onSubmit={async (values) => {
    console.log(values);
  }}
  showErrors
/>
<SignupForm
  onSubmit={async (values) => {
    console.log(values);
  }}
  showErrors
/>
