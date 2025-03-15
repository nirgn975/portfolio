<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() => (colorMode.value === "dark" ? "#111827" : "white"));

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.svg" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: "%s - Nir Galon - website",
  ogImage: "https://nir.galons.io/social-card.png",
  twitterImage: "https://nir.galons.io/social-card.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
