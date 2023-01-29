<script lang="ts">
  import { SigninForm } from "$lib/ui/containers";
  import { Input } from "$lib/ui/components";

  import type { SigninValues } from "$lib/logic/typing/schemas.auth";

  async function onSubmit(values: SigninValues) {
    console.log({ values });
  }
</script>

<h1>Examples</h1>

<div>
  <h2>Example base</h2>
  <SigninForm {onSubmit} />
</div>
<div>
  <h2>Example with slot</h2>
  <SigninForm {onSubmit}>
    <Input id="email-slot" name="email" label="Email" />
    <Input
      id="password-slot"
      name="password"
      type="password"
      label="Password"
    />
  </SigninForm>
</div>
