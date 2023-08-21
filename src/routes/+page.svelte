<script lang="ts">
  import { array, boolean, mixed, string } from "yup";
  import {
    Errors,
    Field,
    File,
    Option,
    Select,
    faivform,
    type SelectOption,
  } from "../lib/index.js";

  const fields = {
    name: string().required(),
    accept: boolean(),
    message: string(),
    type: string().required(),
    types: array().of(string().required()).required(),
    option: string().required(),
    asset: mixed().required(),
  };
  const form = faivform({ fields });
  const { submit, data, errors, setField } = $form;

  const onSubmit = submit(async (values) => {
    console.log(values);
  });

  const options: SelectOption[] = [
    { value: "1", label: "One" },
    { value: "2", label: "Two" },
    { value: "3", label: "Three" },
  ];

  $: console.log({ $data, $errors });
</script>

<form on:submit|preventDefault={onSubmit} class="form" id="test">
  <Field name="name" />
  <Field label="You accept?" name="accept" type="checkbox" />
  <Select name="type" {options} placeholder="Choose an option" />
  <Select
    multiple
    name="types"
    {options}
    placeholder="Choose an option"
    on:choose={({ detail }) => {
      console.log({ detail });
    }}
  />
  <Option name="option" {options} />
  <File name="asset" />

  <button
    type="button"
    on:click={() => {
      setField("type", "2");
    }}
  >
    set type value
  </button>
</form>
<button form="test" type="submit">Submit</button>
<Errors />

<style>
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
</style>
