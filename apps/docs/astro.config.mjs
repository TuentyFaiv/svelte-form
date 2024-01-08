import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: "https://forms.tuentyfaiv.com",
  integrations: [starlight({
    title: "Faivform",
    social: {
      github: "https://github.com/TuentyFaiv/svelte-form"
    },
    sidebar: [{
      label: "Start here",
      translations: {
        es: "Empieza aquí"
      },
      autogenerate: {
        directory: "quick-start"
      },
    }, {
      label: "Components",
      translations: {
        es: "Componentes"
      },
      autogenerate: {
        directory: "components"
      }
    }, {
      label: "Adapters",
      translations: {
        es: "Adaptadores"
      },
      autogenerate: {
        directory: "adapters"
      }
    }, {
      label: "Extras",
      translations: {
        es: "Extras"
      },
      autogenerate: {
        directory: "extras"
      }
    }, {
      label: "Guides",
      translations: {
        es: "Guías"
      },
      autogenerate: {
        directory: "guides"
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
  output: "static",
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