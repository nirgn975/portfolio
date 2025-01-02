<script setup lang="ts">
const route = useRoute();
useSeoMeta({
  ogSiteName: `Nir Galon Portfolio${route.meta.title ? ` | ${route.meta.title}` : ""}`,
  title: `Nir Galon Portfolio${route.meta.title ? ` | ${route.meta.title}` : ""}`,
  ogTitle: `Nir Galon Portfolio${route.meta.title ? ` | ${route.meta.title}` : ""}`,
  // description: "The power of people intelligence at your fingertip.",
  // ogDescription: "The power of people intelligence at your fingertip.",
  // ogImage: "https://datalead.ai/social-banner.webp",
  ogImageAlt: "Nir Galon Portfolio logo",
  ogUrl: "https://nir.galons.io",

  twitterCard: "summary_large_image",
  // twitterImage: "https://datalead.ai/social-banner.webp",
  twitterSite: "@nirgn975",
  twitterCreator: "@nirgn975",
});

useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
});
</script>

<template>
  <NuxtLayout />
</template>

<style>
html {
  font-family: "Helvetica Neue", sans-serif !important;
  @apply h-full scroll-smooth;
}

body,
#__nuxt {
  @apply h-full bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400;
}
</style>
