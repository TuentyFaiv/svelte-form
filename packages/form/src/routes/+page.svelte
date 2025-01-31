<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  // import { array, boolean, mixed, string } from "zod";
  import {
    Errors,
    Field,
    File,
    Option,
    Select,
    faivform,
    type FieldsSchema,
    type SelectOption,
  } from "../lib/index.js";

  // const fields = {
  //   name: string().required(),
  //   accept: boolean(),
  //   message: string(),
  //   type: string().required(),
  //   types: array().of(string().required()).required(),
  //   option: string().required(),
  //   details: string(),
  //   asset: mixed().required(),
  //   assets: array().of(mixed().required()).required(),
  // };
  const fields = {
    name: {
      type: "string",
      required: true,
    },
    accept: "boolean",
    message: "string",
    type: {
      type: "string",
      required: true,
    },
    types: {
      type: "array",
      item: {
        type: "string",
        required: true,
      },
      required: true,
    },
    typenon: {
      type: "string",
      required: true,
    },
    typesnon: {
      type: "array",
      item: {
        type: "string",
        required: true,
      },
      required: true,
    },
    option: {
      type: "string",
      required: true,
    },
    details: "string",
    asset: {
      type: "file",
      required: true,
    },
    assets: {
      type: "array",
      item: {
        type: "file",
        required: true,
      },
      required: true,
    },
  } satisfies FieldsSchema;
  const form = faivform({ fields });
  const { submit, data, errors, setField, setError } = $form;

  let type = null;

  const onSubmit = submit(async (values) => {
    console.log(values);
  });

  function forceSubmit() {
    onSubmit();
  }

  let options: SelectOption[] = [];
  // let options: SelectOption[] = [
  //   { fixed: true, value: "1", label: "One" },
  //   { value: "2", label: "Two" },
  //   { value: "3", label: "Three" },
  // ];

  let optionsType: SelectOption[] = [];
  // let optionsType: SelectOption[] = [
  //   // { value: "1", label: "One" },
  //   // { value: "2", label: "Two" },
  //   { value: "3", label: "Three" },
  // ];

  // $: if ($page.data.type) {
  //   setField("type", $page.data.type);
  //   setField("typenon", $page.data.type);
  // }
  $: if ($page.data.types) {
    console.log("types: ", $page.data.types);
    setField("types", $page.data.types);
    // setField("typesnon", $page.data.types);
  }

  $: console.log("data: ", $data);
  $: console.log("errors: ", $errors);

  onMount(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }).then(() => {
      optionsType = [
        // { value: "1", label: "One" },
        // { value: "2", label: "Two" },
        { value: "3", label: "Three" },
      ];

      options = [
        { fixed: true, value: "1", label: "One" },
        { value: "2", label: "Two" },
        { value: "3", label: "Three" },
      ];
    });
  });
</script>

<form on:submit|preventDefault={onSubmit} class="form" id="test">
  <Field name="name" />
  <Field name="details" type="textarea" />
  <Field label="You accept?" name="accept" type="checkbox" />
  <!-- <Select name="type" options={optionsType} placeholder="Choose an option" /> -->
  <Select
    multiple
    name="types"
    {options}
    placeholder="Choose an option"
    onchoose={(choosed) => {
      console.log({ choosed });
    }}
  />
  <!-- <Select
    searchable={false}
    name="typenon"
    options={optionsType}
    placeholder="Choose an option"
  />
  <Select
    multiple
    searchable={false}
    name="typesnon"
    {options}
    placeholder="Choose an option"
    onchoose={(choosed) => {
      console.log({ choosed });
    }}
  /> -->
  <Option name="option" {options} />
  <File name="asset" />
  <File multiple name="assets" />
  <div>
    <button
      type="button"
      on:click={() => {
        setField("type", "2");
      }}
    >
      set type value
    </button>
    <button
      type="button"
      on:click={() => {
        setField("types", ["2"]);
      }}
    >
      set type value
    </button>
    <button type="button" on:click={forceSubmit}> Force Submit </button>
    <button
      type="button"
      on:click={() => {
        setField("details", "Details example");
      }}
    >
      set details
    </button>
    <button
      type="button"
      on:click={() => {
        setField("accept", !$data.accept);
      }}
    >
      toggle accept
    </button>
  </div>
</form>
<button form="test" type="submit">Submit</button>

<!-- <Errors /> -->

<style>
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
</style>
