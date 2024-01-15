// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxthq/studio", "@nuxt/image", "nuxt-simple-sitemap", "nuxt-simple-robots"],
  content: {
    highlight: {
      theme: {
        default: "github-light", // Default theme
        dark: "github-dark", // Theme used if `html.dark`
      },
    },
    markdown: {
      remarkPlugins: ["remark-reading-time"],
    },
  },
  colorMode: {
    preference: "light",
  },
  image: {
    format: ["avif", "webp"],
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  robots: {
    disallow: [],
    allow: "*",
  },
  sitemap: {
    strictNuxtContentPaths: true,
  },
  site: {
    url: "https://nir.galons.io",
    name: "Nir Galon",
  },
  nitro: {
    preset: "github_pages",
  },
});
