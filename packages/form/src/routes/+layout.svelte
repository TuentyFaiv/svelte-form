<script lang="ts">
  import "../lib/styles/globals.css";

  import { setConfig } from "../lib/index.js";

  let dark = false;
  let primary = "#ccc";
  let secondary = "#000";

  $: setConfig({
    fields: {
      // replace: true,
      field: {
        container: "form__field",
      },
      select: {
        container: "form__field form__field--select",
        item: "form__field__item",
        searchable: "form__field__searchable",
        remove: "form__field__remove",
        clear: "form__field__clear",
      },
    },
    // vars: {
    // primary,
    // secondary,
    // },
  });
</script>

<main>
  <h1>Form examples</h1>
  <button
    on:click={() => {
      if (dark) {
        dark = false;
        primary = "#ccc";
        secondary = "#000";
      } else {
        dark = true;
        primary = "#000";
        secondary = "#ccc";
      }
    }}
  >
    change {dark ? "light" : "dark"}
  </button>
  <slot />
</main>
