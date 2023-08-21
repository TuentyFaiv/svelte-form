<script lang="ts">
  import { setConfig } from "../lib/index.js";

  let dark = false;
  let primary = "#ccc";
  let secondary = "#000";

  $: setConfig({
    fields: {
      // replace: true,
      field: {
        field: "form__field",
      },
      select: {
        field: "form__field form__field--select",
      },
    },
    vars: {
      // primary,
      // secondary,
    },
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
