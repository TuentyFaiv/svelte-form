<script lang="ts">
  import { Input, Select } from "@components";
  import { formSignin } from "@schemas/auth";

  const { submit } = $formSignin;

  const onSubmit = submit((values) => {
    console.log({ values });
  });
</script>

<form on:submit|preventDefault={onSubmit}>
  <Input name="email" type="email" label={"forms:email"} />
  <Input name="password" type="password" label={"forms:password"} />
  <Select
    label="Country"
    name="country"
    placeholder="Select a country"
    options={[
      {
        label: "Mexico",
        value: "MX",
      },
      {
        label: "Colombia",
        value: "Co",
      },
    ]}
  />
  <button type="submit">Submit</button>
</form>
