// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui-pro", "@nuxt/content", "@nuxt/eslint", "@nuxt/image", "@vueuse/nuxt", "nuxt-og-image"],
  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/main.css"],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-07-11",
  nitro: {
    prerender: {
      routes: ["/", "/blog"],
      crawlLinks: true,
    },
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
