<script lang="ts">
  import { ContactForm, Input, SigninForm, SignupForm } from "$lib";

  import type {
    ContactValues,
    SigninValues,
    SignupValues,
    FormStyles,
  } from "$lib";

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

  async function onSubmitContact(values: ContactValues) {
    console.log({ values });
  }
</script>

<section>
  <details>
    <summary>
      <h1>Examples Signin</h1>
    </summary>
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
  </details>
  <details>
    <summary>
      <h1>Examples Signup</h1>
    </summary>
    <div>
      <h2>Example base</h2>
      <SignupForm onSubmit={onSubmitSignup} />
    </div>
    <div>
      <h2>Example with slot</h2>
      <SignupForm onSubmit={onSubmitSignup}>
        <Input id="email-slot" name="email" label="Email" />
        <Input
          id="password-slot"
          name="password"
          type="password"
          label="Password"
        />
      </SignupForm>
    </div>
  </details>
  <details>
    <summary>
      <h1>Examples Contact</h1>
    </summary>
    <div>
      <h2>Example base</h2>
      <ContactForm phoneCode="+52" onSubmit={onSubmitContact} showErrors />
    </div>
    <div>
      <h2>Example with slot</h2>
      <ContactForm phoneCode="+52" onSubmit={onSubmitContact}>
        <Input id="email-slot" name="email" label="Email" />
        <Input id="name-slot" name="name" label="Name" />
      </ContactForm>
    </div>
  </details>
</section>
