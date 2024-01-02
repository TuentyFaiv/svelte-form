<script lang="ts">
  import { injectGlobal } from "@emotion/css";
  import { setConfig } from "../lib/index.js";

  setConfig({
    form: {
      box: "form__box",
      container: "form__container",
      submit: "form__submit",
    },
    vars: {
      primary: "#ccc",
      secondary: "#000",
    },
  });

  injectGlobal`
    .form__box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  `;
</script>

<main>
  <h1>Form examples</h1>
  <slot />
</main>
