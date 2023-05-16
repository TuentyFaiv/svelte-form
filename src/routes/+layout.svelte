<script lang="ts">
  import { onMount } from "svelte";
  import { setStyles, setFormStyles } from "../lib/index.js";

  // setFormStyles({
  //   box: "form__box",
  //   container: "form__container",
  //   submit: "form__submit",
  // });
  // setStyles({
  //   select: {
  //     field: "select-field",
  //     error: "select-error",
  //   },
  // });
  // onMount(() => {});
</script>

<main>
  <h1>Form examples</h1>
  <slot />
</main>
