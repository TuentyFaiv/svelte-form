import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://forms.tuentyfaiv.com",
  integrations: [starlight({
    title: "Faivform",
    social: {
      github: "https://github.com/TuentyFaiv/svelte-form"
    },
    sidebar: [{
      label: "Guides",
      autogenerate: {
        directory: "guides"
      }
    }, {
      label: "Reference",
      autogenerate: {
        directory: "reference"
      }
    }],
    customCss: ["./src/ui/styles/app.css"],
    defaultLocale: "root",
    locales: {
      root: {
        label: "English",
        lang: "en"
      },
      es: {
        label: "Español"
      }
    }
  }), tailwind({
    applyBaseStyles: false
  }), svelte()],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    imagesConfig: {
      sizes: [320, 480, 768, 1024, 1200, 1600, 1920],
      domains: ["forms.tuentyfaiv.com"]
    },
    imageService: true
  })
});