<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData("blog", () => queryCollection("blog").first());
const { data: posts } = await useAsyncData(route.path, () => queryCollection("posts").order("date", "DESC").where("draft", "<>", true).all());
</script>

<template>
  <UContainer>
    <UPageHeader v-bind="page" class="py-[50px]" />

    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post.path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="[post.author]"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          variant="naked"
          :ui="{
            description: 'line-clamp-2',
          }"
        />
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
