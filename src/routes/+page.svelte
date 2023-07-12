<script lang="ts">
  import { string } from "yup";
  import { Errors, Field, File, Option, faivform } from "../lib/index.js";

  const fields = {
    name: string().required(),
  };
  const form = faivform({ fields });
  const { submit } = $form;

  const onSubmit = submit(async (values) => {
    console.log(values);
  });
</script>

<form on:submit|preventDefault={onSubmit}>
  <Field name="name" />
</form>
<Errors />
