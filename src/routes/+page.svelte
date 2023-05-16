<script lang="ts">
  import {
    ContactForm,
    Errors,
    FileInput,
    Option,
    SigninForm,
    SignupForm,
    type SignupValues,
  } from "../lib/index.js";

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

<SigninForm
  submit={async (values) => {
    console.log(values);
  }}
  showErrors
/>
<SignupForm
  {options}
  confirm={false}
  code="byphone"
  submit={onSubmit}
  on:choose={async ({ detail }) => {
    console.log(detail);
    detail.setField("phoneCode", "+52");
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
