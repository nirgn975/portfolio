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
      <i class="fa-thin fa-pencil h-8 w-8"></i>
      <h2 class="ml-2 font-medium text-3xl">Recent Posts</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ArticleCard :post="post" v-for="(post, index) of posts" :key="index" />
    </div>
  </section>

  <section class="py-6">
    <div class="flex items-center my-2">
      <i class="fa-light fa-presentation-screen h-8 w-8"></i>
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
