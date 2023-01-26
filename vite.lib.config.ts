import { defineConfig } from "vite"
import { resolve } from "path"
import { svelte } from "@sveltejs/vite-plugin-svelte"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: resolve("./package"),
    lib: {
      entry: resolve("src/lib.ts"),
      name: "@tuentyfaiv/svelte-form"
    }
  },
  resolve: {
    alias: {
      "@components": resolve("src/ui/components/index.ts"),
      "@containers": resolve("src/ui/containers/index.ts"),
      "@stores": resolve("src/logic/stores/index.ts"),
      "@typing": resolve("src/logic/typing"),
      "@utils": resolve("src/logic/utils"),
      // example code
      "@schemas": resolve("src/logic/example/schemas/")
    }
  }
});
