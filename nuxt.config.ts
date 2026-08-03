// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxt/eslint", "@nuxt/image", "@vueuse/nuxt", "nuxt-og-image"],
  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "latest",
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        // Match the existing Worker name so deploys update it instead of
        // creating a new one under the auto-generated git-remote-based name.
        name: "portfolio",
      },
    },
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
