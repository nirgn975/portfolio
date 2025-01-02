<script setup lang="ts">
defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col bg-zinc-200 dark:bg-zinc-700 rounded-md">
    <a :href="post._path" class="flex-1" aria-label="Title goes to post">
      <h3 class="p-2 text-xl">{{ post.title }}</h3>
    </a>

    <a :href="post.url" aria-label="hero image goes to post">
      <img :src="post.featuredImage" class="object-cover my-2 w-full h-60" alt="`${post.title} post hero image`" />
    </a>

    <p class="line-clamp-3 m-2">
      {{ post.description.replace(/<[^>]*>?/gm, "").substring(0, 250) }}
    </p>

    <div class="flex justify-between p-2 text-zinc-600 dark:text-zinc-500">
      <span class="ml-1 text-sm flex self-end">
        published on
        <time :datetime="post.pubDate" class="ml-1">
          {{
            new Date(post.pubDate).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }}
        </time>
      </span>

      <span class="ml-1 text-sm flex self-end">
        <a
          :href="`/categories/${post.category}`"
          class="flex items-center gap-1 ml-1 hover:text-zinc-700 dark:hover:text-zinc-400"
          :aria-label="`go to ${post.category} category`"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="fill-zinc-700 dark:fill-zinc-400">
            <path
              d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"
            />
          </svg>
          {{ post.category }}
        </a>
      </span>
    </div>
  </div>
</template>
