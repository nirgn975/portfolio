<script setup lang="ts">
const route = useRoute();

const { data: post } = await useAsyncData(route.path, () => queryCollection("posts").path(route.path).first());
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("posts", route.path, {
    fields: ["description"],
  });
});

const title = post.value.title;
const description = post.value.description;

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: "https://nir.galons.io/social-card.png",
  twitterImage: "https://nir.galons.io/social-card.png",
  twitterCard: "summary_large_image",
  ogImageType: "image/png",
  ogUrl: "https://nir.galons.io",
  twitterCreator: "@nirgn975",
  twitterSite: "@nirgn975",
});

if (post.value.image?.src) {
  defineOgImage({
    url: post.value.image.src,
  });
} else {
  defineOgImageComponent("Saas", {
    headline: "Blog",
  });
}
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader :title="post.title">
      <template #headline>
        <UBadge v-bind="post.badge" variant="subtle" />
        <span class="text-(--ui-text-muted)">&middot;</span>
        <time class="text-(--ui-text-muted)">{{ new Date(post.date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }) }}</time>
        <span class="text-(--ui-text-muted)">&middot;</span>
        <UButton :to="post.author.to" :label="post.author.name" color="neutral" variant="link" target="_blank" class="px-0" />
      </template>

      <img :src="post.image.src" class="object-cover max-h-60 w-full mt-4 rounded-lg" />
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer v-if="post" :value="post" />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template v-if="post?.body?.toc?.links?.length" #right>
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
