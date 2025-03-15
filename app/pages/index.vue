<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => queryCollection("index").first());
const { data: posts } = await useAsyncData("posts", () => queryCollection("posts").order("date", "DESC").where("draft", "<>", true).limit(3).all());

useSeoMeta({
  titleTemplate: "",
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
});
</script>

<template>
  <div>
    <UContainer class="mt-10">
      <span class="flex gap-2 items-center font-medium text-3xl -mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8 text-gray-800 dark:text-gray-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          ></path>
        </svg>
        <h2>Recent posts</h2>
      </span>

      <p>{{ posts }}</p>

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
            orientation="vertical"
            variant="naked"
            :ui="{
              description: 'line-clamp-2',
            }"
          />
        </UBlogPosts>
      </UPageBody>
    </UContainer>

    <UContainer class="mt-8 pb-24">
      <span class="flex gap-2 items-center font-medium text-3xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8 fill-gray-800 dark:fill-gray-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
        <h2>Active projects</h2>
      </span>

      <UPageGrid>
        <UPageCard
          v-for="(card, index) in page.projects"
          :key="index"
          v-bind="card"
          orientation="horizontal"
          :reverse="index % 2 == 0 ? false : true"
          spotlight
          spotlight-color="primary"
        >
          <img :src="card.img" :alt="card.title" class="w-full rounded-lg" />
        </UPageCard>
      </UPageGrid>
    </UContainer>

    <UContainer class="mt-8 pb-24">
      <span class="flex gap-2 items-center font-medium text-3xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="size-8 fill-gray-800 dark:fill-gray-300">
          <path
            d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V288c0 35.3 28.7 64 64 64H256v34.7l-70.6 70.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L288 445.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L320 386.7V352H480c35.3 0 64-28.7 64-64V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512 64 32zM96 64H480V288H288 96V64z"
          ></path>
        </svg>
        <h2>Upcoming talks</h2>
      </span>

      <p class="px-4">No upcoming talks schedule</p>
    </UContainer>
  </div>
</template>
