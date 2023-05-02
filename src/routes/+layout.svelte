<script lang="ts">
  import { onMount } from "svelte";
  import { setStyles } from "../lib/index.js";

  // setStyles({
  //   select: {
  //     field: "select-field",
  //     error: "select-error",
  //   },
  // });
  // onMount(() => {
  // });
</script>

<main>
  <h1>Form examples</h1>
  <slot />
</main>
