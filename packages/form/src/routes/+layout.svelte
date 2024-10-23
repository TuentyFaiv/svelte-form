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

  // colors
  // primary: {
  //   50: theme?.light?.primary?.["50"] ?? "222 246 238", // #def6ee
  //   100: theme?.light?.primary?.["100"] ?? "211 242 232", // #d3f2e8
  //   200: theme?.light?.primary?.["200"] ?? "200 239 226", // #c8efe2
  //   300: theme?.light?.primary?.["300"] ?? "166 230 209", // #a6e6d1
  //   400: theme?.light?.primary?.["400"] ?? "100 211 174", // #64d3ae
  //   500: theme?.light?.primary?.["500"] ?? "33 192 139", // #21C08B
  //   600: theme?.light?.primary?.["600"] ?? "30 173 125", // #1ead7d
  //   700: theme?.light?.primary?.["700"] ?? "25 144 104", // #199068
  //   800: theme?.light?.primary?.["800"] ?? "20 115 83", // #147353
  //   900: theme?.light?.primary?.["900"] ?? "16 94 68", // #105e44
  // },
  // secondary: {
  //   50: theme?.light?.secondary?.["50"] ?? "233 223 243", // #e9dff3
  //   100: theme?.light?.secondary?.["100"] ?? "226 212 240", // #e2d4f0
  //   200: theme?.light?.secondary?.["200"] ?? "219 202 236", // #dbcaec
  //   300: theme?.light?.secondary?.["300"] ?? "197 170 224", // #c5aae0
  //   400: theme?.light?.secondary?.["400"] ?? "154 106 201", // #9a6ac9
  //   500: theme?.light?.secondary?.["500"] ?? "110 42 178", // #6E2AB2
  //   600: theme?.light?.secondary?.["600"] ?? "99 38 160", // #6326a0
  //   700: theme?.light?.secondary?.["700"] ?? "83 32 134", // #532086
  //   800: theme?.light?.secondary?.["800"] ?? "66 25 107", // #42196b
  //   900: theme?.light?.secondary?.["900"] ?? "54 21 87", // #361557
  // },
  // accent: {
  //   50: theme?.light?.accent?.["50"] ?? "252 236 217", // #fcecd9
  //   100: theme?.light?.accent?.["100"] ?? "251 230 205", // #fbe6cd
  //   200: theme?.light?.accent?.["200"] ?? "250 223 192", // #fadfc0
  //   300: theme?.light?.accent?.["300"] ?? "247 204 155", // #f7cc9b
  //   400: theme?.light?.accent?.["400"] ?? "242 166 79", // #f2a64f
  //   500: theme?.light?.accent?.["500"] ?? "236 128 4", // #ec8004
  //   600: theme?.light?.accent?.["600"] ?? "212 115 4", // #d47304
  //   700: theme?.light?.accent?.["700"] ?? "177 96 3", // #b16003
  //   800: theme?.light?.accent?.["800"] ?? "142 77 2", // #8e4d02
  //   900: theme?.light?.accent?.["900"] ?? "116 63 2", // #743f02
  // },
  // success: {
  //   50: theme?.light?.success?.["50"] ?? "225 245 225", // #e1f5e1
  //   100: theme?.light?.success?.["100"] ?? "215 242 215", // #d7f2d7
  //   200: theme?.light?.success?.["200"] ?? "205 239 206", // #cdefce
  //   300: theme?.light?.success?.["300"] ?? "175 229 176", // #afe5b0
  //   400: theme?.light?.success?.["400"] ?? "115 210 116", // #73d274
  //   500: theme?.light?.success?.["500"] ?? "55 190 57", // #37be39
  //   600: theme?.light?.success?.["600"] ?? "50 171 51", // #32ab33
  //   700: theme?.light?.success?.["700"] ?? "41 143 43", // #298f2b
  //   800: theme?.light?.success?.["800"] ?? "33 114 34", // #217222
  //   900: theme?.light?.success?.["900"] ?? "27 93 28", // #1b5d1c
  // },
  // warning: {
  //   50: theme?.light?.warning?.["50"] ?? "255 244 217", // #fff4d9
  //   100: theme?.light?.warning?.["100"] ?? "255 241 204", // #fff1cc
  //   200: theme?.light?.warning?.["200"] ?? "255 237 191", // #ffedbf
  //   300: theme?.light?.warning?.["300"] ?? "255 227 153", // #ffe399
  //   400: theme?.light?.warning?.["400"] ?? "255 205 77", // #ffcd4d
  //   500: theme?.light?.warning?.["500"] ?? "255 184 0", // #FFB800
  //   600: theme?.light?.warning?.["600"] ?? "230 166 0", // #e6a600
  //   700: theme?.light?.warning?.["700"] ?? "191 138 0", // #bf8a00
  //   800: theme?.light?.warning?.["800"] ?? "153 110 0", // #996e00
  //   900: theme?.light?.warning?.["900"] ?? "125 90 0", // #7d5a00
  // },
  // error: {
  //   50: theme?.light?.error?.["100"] ?? "242 216 216", // #f2d8d8
  //   100: theme?.light?.error?.["200"] ?? "239 206 206", // #efcece
  //   200: theme?.light?.error?.["300"] ?? "229 176 176", // #e5b0b0
  //   300: theme?.light?.error?.["400"] ?? "210 117 117", // #d27575
  //   400: theme?.light?.error?.["300"] ?? "250 142 142", // #fa8e8e
  //   500: theme?.light?.error?.["500"] ?? "191 58 58", // #BF3A3A
  //   600: theme?.light?.error?.["600"] ?? "172 52 52", // #ac3434
  //   700: theme?.light?.error?.["700"] ?? "143 44 44", // #8f2c2c
  //   800: theme?.light?.error?.["800"] ?? "115 35 35", // #732323
  //   900: theme?.light?.error?.["900"] ?? "94 28 28", // #5e1c1c
  // },
  // placeholder: {
  //   50: theme?.light?.placeholder?.["50"] ?? "225 225 228", // #e1e1e4
  //   100: theme?.light?.placeholder?.["100"] ?? "215 215 219", // #d7d7db
  //   200: theme?.light?.placeholder?.["200"] ?? "205 205 210", // #cdcdd2
  //   300: theme?.light?.placeholder?.["300"] ?? "174 175 183", // #aeafb7
  //   400: theme?.light?.placeholder?.["400"] ?? "114 116 129", // #727481
  //   500: theme?.light?.placeholder?.["500"] ?? "53 56 75", // #35384B
  //   600: theme?.light?.placeholder?.["600"] ?? "48 50 68", // #303244
  //   700: theme?.light?.placeholder?.["700"] ?? "40 42 56", // #282a38
  //   800: theme?.light?.placeholder?.["800"] ?? "32 34 45", // #20222d
  //   900: theme?.light?.placeholder?.["900"] ?? "26 27 37", // #1a1b25
  // },
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
