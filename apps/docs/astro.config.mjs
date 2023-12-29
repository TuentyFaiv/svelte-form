import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"]
  },
  site: "https://forms.tuentyfaiv.com",
  integrations: [svelte(), tailwind(), sitemap()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    imagesConfig: {
      sizes: [320, 480, 768, 1024, 1200, 1600, 1920],
      domains: ["forms.tuentyfaiv.com"],
    },
    imageService: true
  })
});