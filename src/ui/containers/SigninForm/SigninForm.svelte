<script lang="ts">
  import { Input } from "@components";
  import { formSignin } from "@schemas/auth";

  const { submit } = $formSignin;

  const onSubmit = submit((values) => {
    console.log({ values });
  });
</script>

<form on:submit|preventDefault={onSubmit}>
  <Input name="email" type="email" label={"forms:email"} />
  <Input name="password" type="password" label={"forms:password"} />
  <button type="submit">Submit</button>
</form>
