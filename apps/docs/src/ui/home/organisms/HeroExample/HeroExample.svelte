<script lang="ts">
  import { boolean, string } from "yup";
  import { Field, Select, faivform } from "@tuentyfaiv/svelte-form";

  import type { SelectOption } from "@tuentyfaiv/svelte-form";

  const fields = {
    username: string().required(),
    message: string(),
    like: boolean(),
    much: string().required(),
  };
  const form = faivform({ fields });
  const { submit, data, errors } = $form;

  const onSubmit = submit(async (values) => {
    console.log(values);
  });

  const options: SelectOption[] = [
    { label: "sad", value: "sad" },
    { label: "happy", value: "happy" },
    { label: "angry", value: "angry" },
  ];
</script>

<div class="hero-example">
  <form
    on:submit|preventDefault={onSubmit}
    class="hero-example__form"
    id="test"
  >
    <Field name="username" label="Leve an user name" />
    <Field name="message" type="textarea" label="Leve a message" />
    <Field label="Do you like it?" name="like" type="checkbox" />
    <Select
      label="How much like it?"
      placeholder="Choose an option"
      name="much"
      {options}
    />
  </form>
  <button form="test" type="submit">Submit</button>
  <div class="hero-example__data">
    <div class="hero-exmample__box">
      <h2>Data</h2>
      <pre>
        <code>{JSON.stringify($data, null, 2)}</code>
      </pre>
    </div>
    <div class="hero-exmample__box">
      <h2>Errors</h2>
      <pre>
        <code>{JSON.stringify($errors, null, 2)}</code>
      </pre>
    </div>
  </div>
</div>

<style lang="postcss">
  .hero-example {
    @apply w-full max-w-screen-md mx-auto;
    &__data {
      @apply w-full flex justify-center items-start gap-4;
    }
    &__box {
      @apply flex-1;
    }
    &__form {
      @apply w-full flex flex-col gap-4;
    }
  }
</style>
