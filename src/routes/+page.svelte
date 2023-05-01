<script lang="ts">
  import { Errors, SigninForm } from "../lib/index.js";
</script>

<SigninForm
  onSubmit={async (values) => {
    console.log(values);
  }}
  showErrors
>
  testing
</SigninForm>
