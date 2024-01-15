<script setup lang="ts">
const route = useRoute();
const allTags = new Set();
const filteredPosts: Record<string, any> = new Set();
const allPosts = (await queryContent("/").find())
  .filter((post) => {
    post.tags.map((tag) => allTags.add(tag.toLowerCase()));
    return import.meta.env.MODE == "development" || !post.frontmatter.draft;
  })
  .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

Array.from(allTags).map((tag) => {
  allPosts.map((post) => {
    if (post.tags.includes(tag)) {
      filteredPosts.add(post);
    }
  });
});
</script>

<template>
  <div class="flex items-center my-6">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400">
      <path
        d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"
      />
    </svg>
    <h2 class="ml-2 font-medium text-3xl">{{ route.params.tag[0] }}</h2>
  </div>

  <div>
    <div class="flex justify-between" v-for="(post, index) of filteredPosts" :key="index">
      <a :href="post._path" class="py-1 block hover:text-zinc-800 dark:hover:text-zinc-300">{{ post.title }}</a>
      <time :datetime="post.pubDate" class="ml-1">
        {{ new Date(post.pubDate).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" }) }}
      </time>
    </div>
  </div>
</template>
