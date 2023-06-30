<script lang="ts">
  import { setConfig } from "../lib/index.js";

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
  });
</script>

<main>
  <h1>Form examples</h1>
  <slot />
</main>
