<script setup lang="ts">
const allPosts = (await queryContent("/").find())
  .filter((post) => import.meta.env.MODE == "development" || !post.draft)
  .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

const categories: Record<string, any> = {};
allPosts.map((post: Record<string, any>) => {
  if (!post.category) {
    return;
  }

  if (!categories[String(post.category)]) {
    categories[String(post.category)] = [];
  }

  categories[String(post.category)].push({ title: post.title, _path: post._path });
});
</script>

<template>
  <h2 class="my-6 font-medium text-3xl">All Categories</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div v-for="(category, index) of Object.keys(categories).sort()" :key="index">
      <div class="flex items-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="h-5 w-5 fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"
          />
        </svg>
        <h3 class="ml-2 font-medium text-xl capitalize">{{ category }}</h3>
      </div>
      <a
        :href="post._path"
        class="ml-4 py-1 block hover:text-zinc-800 dark:hover:text-zinc-300"
        v-for="(post, postIndex) of categories[category]"
        :key="postIndex"
        >{{ post.title }}</a
      >
    </div>
  </div>
</template>
