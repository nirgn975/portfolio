<script setup lang="ts">
const route = useRoute();
definePageMeta({ title: "Blog" });

const page = ref(1);
const total = await queryContent("/").count();
let posts = ref([] as Array<any>);
getPosts();

watch(page, () => {
  getPosts();
});

async function getPosts() {
  if (route.query.category) {
    posts.value = await queryContent("/")
      .where({ categories: { $contains: String(route.query.category) } })
      .sort({ pubDate: -1 })
      .skip((page.value - 1) * 5)
      .limit(5)
      .find();
  } else {
    posts.value = await queryContent("/")
      .sort({ pubDate: -1 })
      .skip((page.value - 1) * 5)
      .limit(5)
      .find();
  }
}
</script>

<template>
  <section class="flex flex-col items-center">
    <div class="px-4 md:px-0 md:w-5/6 lg:w-3/4 xl:w-2/3">
      <img src="/blog-hero.webp" alt="Blog Logo" class="mt-8" />

      <div class="text-center my-4">
        <p class="text-zinc-400 dark:text-zinc-600 mt-2">All of the posts are written for educational purposes only.</p>
      </div>

      <div class="flex flex-col items-center divide-y divide-zinc-300 dark:divide-zinc-700">
        <article class="py-6 w-full" v-for="(post, index) of posts" :key="index">
          <a :href="post.url">
            <img :src="post.featuredImage" class="object-cover my-2 w-full h-60" />
          </a>

          <h2 class="my-1 text-lg font-bold">
            <a :href="post._path" class="hover:text-zinc-800 dark:hover:text-zinc-300">{{ post.title }}</a>
          </h2>

          <div class="flex items-center">
            <span>
              <a href="/about" class="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" class="fill-zinc-700 dark:fill-zinc-400">
                  <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
                Nir Galon
              </a>
            </span>
            <span class="ml-2 text-sm text-zinc-400 dark:text-zinc-600 flex self-end">
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
            <span class="ml-1 text-sm text-zinc-400 dark:text-zinc-600 flex self-end">
              included in
              <a
                :href="`/categories/${post.category}`"
                class="flex items-center gap-1 text-zinc-700 dark:text-zinc-400 ml-2 hover:text-zinc-800 dark:hover:text-zinc-300"
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

          <p class="line-clamp-3 text-zinc-400 dark:text-zinc-600 my-1">{{ post.description }}</p>

          <div class="flex justify-between items-center">
            <a :href="post._path" class="text-sky-500 hover:text-sky-400">Read More</a>
            <div class="max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" class="inline-block fill-zinc-700 dark:fill-zinc-400">
                <path
                  d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
              <a
                :href="`/tags/${tag}`"
                class="ml-1 text-sm inline-block hover:text-zinc-800 dark:hover:text-zinc-300"
                v-for="(tag, indexTag) of post.tags"
                :key="indexTag"
              >
                {{ indexTag == post.tags.length - 1 ? tag : `${tag},` }}
              </a>
            </div>
          </div>
        </article>
      </div>

      <div class="flex justify-center mt-4">
        <UPagination
          size="md"
          v-model="page"
          :page-count="5"
          :total="total"
          :active-button="{ variant: 'outline', color: 'gray' }"
          :inactive-button="{ color: 'gray' }"
          :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Prev', color: 'gray' }"
          :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Next', color: 'gray' }"
        />
      </div>
    </div>
  </section>
</template>
