<script lang="ts">
  import { onMount } from "svelte";
  import { setConfig } from "../lib/index.js";
  import { writable } from "svelte/store";

  setConfig({
    form: {
      box: "form__box",
      container: "form__container",
      submit: "form__submit",
    },
    fields: {
      select: {
        field: "select-field",
        error: "select-error",
      },
    },
    i18n: writable({
      t: (key: string) => key,
    }),
  });
  // onMount(() => {});
</script>

<main>
  <h1>Form examples</h1>
  <slot />
</main>
