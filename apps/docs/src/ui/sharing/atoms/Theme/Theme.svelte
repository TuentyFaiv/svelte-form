<script lang="ts">
  const themes = ["system", "light", "dark"];
  let activeTheme: "system" | "dark" | "light" =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as "system") ?? "system"
      : "system";

  $: if (typeof window !== "undefined") {
    const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const themeMediaListener = (event: MediaQueryListEvent) => {
      if (event.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (activeTheme === "system") {
      themeMedia.addEventListener("change", themeMediaListener);
      localStorage.setItem("theme", "system");
      if (themeMedia.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      themeMedia.removeEventListener("change", themeMediaListener);
      if (activeTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      }
    }
  }
</script>

<label for="theme" class="theme">
  <select
    name="theme"
    id="theme"
    class="theme__action"
    bind:value={activeTheme}
  >
    {#each themes as theme}
      <option value={theme}>
        {`${theme.charAt(0).toUpperCase()}${theme.slice(1)}`}
      </option>
    {/each}
  </select>
</label>

<style lang="postcss">
  .theme {
    @apply flex justify-center items-center gap-1;
    &:hover {
      @apply cursor-pointer;
    }
    &__action {
      @apply block font-medium appearance-none bg-transparent py-2 px-4;
      &:hover {
        @apply cursor-pointer;
      }
    }
  }
</style>
