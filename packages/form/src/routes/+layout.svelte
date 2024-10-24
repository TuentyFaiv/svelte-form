<script lang="ts">
  import "../lib/styles/globals.css";

  import { setConfig } from "../lib/index.js";

  let dark = false;
  let primary = "#ccc";
  let secondary = "#000";

  $: setConfig({
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
  });

  //   **Primary:**
  // - <Palette value={50} color="rgb(222, 246, 238)" />
  // - <Palette value={100} color="rgb(211, 242, 232)" />
  // - <Palette value={200} color="rgb(200, 239, 226)" />
  // - <Palette value={300} color="rgb(166, 230, 209)" />
  // - <Palette value={400} color="rgb(100, 211, 174)" />
  // - <Palette value={500} color="rgb(33, 192, 139)" />
  // - <Palette value={600} color="rgb(30, 173, 125)" />
  // - <Palette value={700} color="rgb(25, 144, 104)" />
  // - <Palette value={800} color="rgb(20, 115, 83)" />
  // - <Palette value={900} color="rgb(16, 94, 68)" />

  // **Secondary:**
  // - <Palette value={50} color="rgb(233, 223, 243)" />
  // - <Palette value={100} color="rgb(226, 212, 240)" />
  // - <Palette value={200} color="rgb(219, 202, 236)" />
  // - <Palette value={300} color="rgb(197, 170, 224)" />
  // - <Palette value={400} color="rgb(154, 106, 201)" />
  // - <Palette value={500} color="rgb(110, 42, 178)" />
  // - <Palette value={600} color="rgb(99, 38, 160)" />
  // - <Palette value={700} color="rgb(83, 32, 134)" />
  // - <Palette value={800} color="rgb(66, 25, 107)" />
  // - <Palette value={900} color="rgb(54, 21, 87)" />

  // **Accent:**
  // - <Palette value={50} color="rgb(252, 236, 217)" />
  // - <Palette value={100} color="rgb(251, 230, 205)" />
  // - <Palette value={200} color="rgb(250, 223, 192)" />
  // - <Palette value={300} color="rgb(247, 204, 155)" />
  // - <Palette value={400} color="rgb(242, 166, 79)" />
  // - <Palette value={500} color="rgb(236, 128, 4)" />
  // - <Palette value={600} color="rgb(212, 115, 4)" />
  // - <Palette value={700} color="rgb(177, 96, 3)" />
  // - <Palette value={800} color="rgb(142, 77, 2)" />
  // - <Palette value={900} color="rgb(116, 63, 2)" />

  // **Success:**
  // - <Palette value={50} color="rgb(225, 245, 225)" />
  // - <Palette value={100} color="rgb(215, 242, 215)" />
  // - <Palette value={200} color="rgb(205, 239, 206)" />
  // - <Palette value={300} color="rgb(175, 229, 176)" />
  // - <Palette value={400} color="rgb(115, 210, 116)" />
  // - <Palette value={500} color="rgb(55, 190, 57)" />
  // - <Palette value={600} color="rgb(50, 171, 51)" />
  // - <Palette value={700} color="rgb(41, 143, 43)" />
  // - <Palette value={800} color="rgb(33, 114, 34)" />
  // - <Palette value={900} color="rgb(27, 93, 28)" />

  // **Warning:**
  // - <Palette value={50} color="rgb(255, 244, 217)" />
  // - <Palette value={100} color="rgb(255, 241, 204)" />
  // - <Palette value={200} color="rgb(255, 237, 191)" />
  // - <Palette value={300} color="rgb(255, 227, 153)" />
  // - <Palette value={400} color="rgb(255, 205, 77)" />
  // - <Palette value={500} color="rgb(255, 184, 0)" />
  // - <Palette value={600} color="rgb(230, 166, 0)" />
  // - <Palette value={700} color="rgb(191, 138, 0)" />
  // - <Palette value={800} color="rgb(153, 110, 0)" />
  // - <Palette value={900} color="rgb(125, 90, 0)" />

  // **Error:**
  // - <Palette value={50} color="rgb(242, 216, 216)" />
  // - <Palette value={100} color="rgb(239, 206, 206)" />
  // - <Palette value={200} color="rgb(229, 176, 176)" />
  // - <Palette value={300} color="rgb(210, 117, 117)" />
  // - <Palette value={400} color="rgb(250, 142, 142)" />
  // - <Palette value={500} color="rgb(191, 58, 58)" />
  // - <Palette value={600} color="rgb(172, 52, 52)" />
  // - <Palette value={700} color="rgb(143, 44, 44)" />
  // - <Palette value={800} color="rgb(115, 35, 35)" />
  // - <Palette value={900} color="rgb(94, 28, 28)" />

  // **Placeholder:**
  // - <Palette value={50} color="rgb(225, 225, 228)" />
  // - <Palette value={100} color="rgb(215, 215, 219)" />
  // - <Palette value={200} color="rgb(205, 205, 210)" />
  // - <Palette value={300} color="rgb(174, 175, 183)" />
  // - <Palette value={400} color="rgb(114, 116, 129)" />
  // - <Palette value={500} color="rgb(53, 56, 75)" />
  // - <Palette value={600} color="rgb(48, 50, 68)" />
  // - <Palette value={700} color="rgb(40, 42, 56)" />
  // - <Palette value={800} color="rgb(32, 34, 45)" />
  // - <Palette value={900} color="rgb(26, 27, 37)" />
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
