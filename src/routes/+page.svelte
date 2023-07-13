<script lang="ts">
  import { mixed, string } from "yup";
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
    type: string().required(),
    option: string().required(),
    asset: mixed().required(),
  };
  const form = faivform({ fields });
  const { submit } = $form;

  const onSubmit = submit(async (values) => {
    console.log(values);
  });

  const options: SelectOption[] = [
    { value: "1", label: "One" },
    { value: "2", label: "Two" },
    { value: "3", label: "Three" },
  ];
</script>

<form on:submit|preventDefault={onSubmit}>
  <Field name="name" />
  <Select name="type" {options} />
  <Option name="option" {options} />
  <File name="asset" />
  <button type="submit">Submit</button>
</form>
<Errors />
