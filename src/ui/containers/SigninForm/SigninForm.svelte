<script lang="ts">
  import { FileInput, Input, Option, Select } from "$lib/ui/components";
  import { formSignin } from "@schemas/auth";

  const { submit } = $formSignin;

  const onSubmit = submit((values) => {
    console.log({ values });
  });
</script>

<form on:submit|preventDefault={onSubmit}>
  <Input name="email" type="email" label={"forms:email"} />
  <Input name="password" type="password" label={"forms:password"} />
  <FileInput name="avatar" defaultValue="/favicon.png">
    <svelte:fragment slot="out" let:image>
      <img src={image.src} alt={image.alt} />
    </svelte:fragment>
    <div slot="actions" let:onClear>
      <button type="button" on:click={onClear}> cancel </button>
    </div>
    <p slot="activate">open file</p>
  </FileInput>
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
  <Option id="1" value="one" label="Method one" name="method" />
  <Option id="2" value="two" label="Method two" name="method" />
  <Option id="3" value="three" label="Method three" name="method" />
  <button type="submit">Submit</button>
</form>
