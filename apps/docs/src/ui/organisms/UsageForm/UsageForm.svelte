<script lang="ts">
  import { faivform, Field } from "@tuentyfaiv/svelte-form";
  import { string, boolean } from "yup";

  const form = faivform({
    fields: {
      name: string().required(),
      message: string().required(),
      accept: boolean().required(),
    },
  });

  const onSubmit = $form.submit(async (values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>

<form on:submit|preventDefault={onSubmit}>
  <Field name="name" label="Name:" />
  <Field name="message" label="Leave a message:" type="textarea" />
  <Field name="accept" label="Accept terms:" type="checkbox" />
  <button type="submit"> Submit </button>
</form>
