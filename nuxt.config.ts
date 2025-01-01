// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ["@nuxthq/studio", "@nuxt/content"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  content: {
    // ... options
  },
});
