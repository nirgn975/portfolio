<script setup lang="ts">
import ArticleCard from "@/components/ArticleCard.vue";

const talksData = [
  {
    future: false,
    image: "/about/talks/pipenv-the-future-of-python-dependency-management.webp",
    title: "Pipenv: The future of Python dependency management",
    date: "4/12/17",
    meetupUrl: "https://www.meetup.com/PyWeb-IL/events/245071494",
    downloadUrl: "/about/talks/pipenv-the-future-of-python-dependency-management.pptx",
  },
];

const posts = (await queryContent("/").find())
  .filter((post) => import.meta.env.MODE == "development" || !post.draft)
  .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf())
  .slice(0, 3);
</script>

<template>
  <p id="typeit" class="text-center mt-4 text-lg"></p>

  <!-- Recent posts -->
  <section class="py-6">
    <div class="flex items-center my-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-8 w-8 text-zinc-700 dark:text-zinc-400"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
        />
      </svg>
      <h2 class="ml-2 font-medium text-3xl">Recent Posts</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ArticleCard :post="post" v-for="(post, index) of posts" :key="index" />
    </div>
  </section>

  <section class="py-6">
    <div class="flex items-center my-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400">
        <path
          d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V288c0 35.3 28.7 64 64 64H256v34.7l-70.6 70.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L288 445.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L320 386.7V352H480c35.3 0 64-28.7 64-64V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512 64 32zM96 64H480V288H288 96V64z"
        />
      </svg>
      <h2 class="ml-2 font-medium text-3xl">Upcoming & Recent Talks</h2>
    </div>

    <div>
      <div class="flex flex-col md:flex-row" v-for="(talk, index) of talksData" :key="index">
        <img :src="talk.image" alt="Talk Thumbnail" class="my-2" />
        <div class="p-4">
          <h3 class="text-2xl">{{ talk.title }}</h3>
          <p class="pt-2">
            <time>{{ talk.date }}</time> |
            <span> <a :href="talk.meetupUrl" target="_blank" rel="noreferrer" class="text-sky-500 hover:text-sky-400">Meetpup Page</a> | </span>
            <span>
              <a :href="talk.downloadUrl" target="_blank" rel="noreferrer" class="text-sky-500 hover:text-sky-400">Download</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
