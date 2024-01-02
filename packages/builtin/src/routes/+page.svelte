<script lang="ts">
  import { ContactForm, SigninForm, SignupForm } from "../lib/index.js";
  import type { SignupValues } from "../lib/index.js";

  const countries = [
    {
      key: "MX",
      label: "+52",
      value: "+52",
      flag: "🇲🇽",
    },
    {
      key: "PE",
      label: "+51",
      value: "+51",
      flag: "🇵🇪",
    },
    {
      key: "CL",
      label: "+56",
      value: "+56",
      flag: "🇨🇱",
    },
    {
      key: "PA",
      label: "+507",
      value: "+507",
      flag: "🇵🇦",
    },
    {
      key: "CR",
      label: "+506",
      value: "+506",
      flag: "🇨🇷",
    },
  ];
  const options = countries.map(({ flag, ...country }) => ({
    ...country,
    label: `${flag} ${country.label}`,
  }));

  $: onSubmit = async ({ phoneCode, ...values }: SignupValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    throw new Error("custom-error");
  };
</script>

<details>
  <summary>
    <h2>Signin form</h2>
  </summary>
  <SigninForm
    submit={async (values) => {
      console.log(values);
    }}
    showErrors
    styles={{
      form: {
        box: "signin__box",
      },
    }}
  >
    <svelte:fragment slot="error-field" let:error>
      {`Error field: ${error}`}
    </svelte:fragment>
    <svelte:fragment slot="error-list" let:error>
      {`Error list: ${error}`}
    </svelte:fragment>
  </SigninForm>
</details>

<details>
  <summary>
    <h2>Signup form</h2>
  </summary>
  <SignupForm
    {options}
    confirm={false}
    submit={onSubmit}
    on:choose={async ({ detail }) => {
      console.log(detail);
      detail.setField("phoneCode", "+52");
    }}
    showErrors
  >
    <svelte:fragment slot="error-field" let:error>
      {`Error field: ${error}`}
    </svelte:fragment>
  </SignupForm>
</details>

<details>
  <summary>
    <h2>Contact form</h2>
  </summary>
  <ContactForm
    submit={async (values) => {
      console.log(values);
    }}
    texts={{
      email: {
        label: "Email",
        placeholder: "email@example.com",
      },
      message: {
        label: "Message",
        placeholder: "Leave your message",
      },
      name: "Name",
      phone: "Phone",
      terms: "You must accept the terms and conditions",
    }}
    showErrors
  >
    <svelte:fragment slot="error-field" let:error>
      {`Error field: ${error}`}
    </svelte:fragment>
    <svelte:fragment slot="error-list" let:error>
      {`Error list: ${error}`}
    </svelte:fragment>
  </ContactForm>
</details>
