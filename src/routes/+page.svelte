<script lang="ts">
  import { Input, SigninForm, SignupForm } from "$lib";

  import type { SigninValues, SignupValues } from "$lib";
  import type { FormStyles } from "$lib";

  const styles: FormStyles = {
    form: {},
    input: {},
    fileinput: {},
    select: {},
    option: {},
    icons: {
      show: "icon-show",
      hide: "icon-hide",
    },
  };

  async function onSubmitSignin(values: SigninValues) {
    console.log({ values });
  }

  async function onSubmitSignup(values: SignupValues) {
    console.log({ values });
  }
</script>

<section>
  <h1>Examples Signin</h1>
  <div>
    <h2>Example base</h2>
    <SigninForm onSubmit={onSubmitSignin} {styles} />
  </div>
  <div>
    <h2>Example with slot</h2>
    <SigninForm onSubmit={onSubmitSignin}>
      <Input id="email-slot" name="email" label="Email" />
      <Input
        id="password-slot"
        name="password"
        type="password"
        label="Password"
      />
    </SigninForm>
  </div>
</section>
<section>
  <h1>Examples Signup</h1>
  <div>
    <h2>Example base</h2>
    <SignupForm onSubmit={onSubmitSignup} />
  </div>
  <!-- <div>
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
  </div> -->
</section>
