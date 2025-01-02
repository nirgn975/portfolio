// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ["@nuxthq/studio", "@nuxt/content", "@nuxt/ui"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      posthogPublicKey: "phc_qBbm15wGFBf8pJ42gkKA8snzOuHBrDY6JjeTfIFApKK",
      posthogHost: "https://us.i.posthog.com",
    },
  },
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
});
