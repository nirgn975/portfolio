<script setup lang="ts">
import Giscus from "@giscus/vue";
import ArticleCard from "@/components/ArticleCard.vue";

const route = useRoute();
const currentPost = await queryContent(route.path).findOne();

useSeoMeta({
  title: currentPost.title,
  ogTitle: currentPost.title,
  description: currentPost.description,
  ogDescription: currentPost.description,
  ogImage: `https://nir.galons.io${currentPost.featuredImage}`,
  ogImageAlt: "Nir Galon blog post hero image",
  ogUrl: `https://nir.galons.io${currentPost._path}`,

  twitterCard: "summary_large_image",
  twitterImage: `https://nir.galons.io${currentPost.featuredImage}`,

  ogType: "article",
  ogLocale: "en_US",
  articleAuthor: currentPost.author,
  articlePublishedTime: currentPost.pubDate,
});

const mightLikePosts = (await queryContent("/").find())
  .filter((post) => import.meta.env.MODE == "development" || !post.draft)
  .filter((post) => post._path !== currentPost._path)
  .map((post) => {
    const filteredArray = post.tags.filter((value: string) => currentPost.tags.includes(value));
    const dupwPost = Object.assign({}, post, { match: filteredArray.length });
    return dupwPost;
  })
  .sort((a, b) => b.match - a.match)
  .slice(0, 10)
  .sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());
</script>

<template>
  <article>
    <h2 class="mt-4 mb-2 text-3xl font-bold">{{ currentPost.title }}</h2>

    <div class="flex mb-1">
      <span>
        <a href="/about" target="_blank" class="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-300">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" class="fill-zinc-700 dark:fill-zinc-400">
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>
          Nir Galon
        </a>
      </span>

      <span class="ml-1 text-sm text-zinc-400 dark:text-zinc-600 flex self-end" v-if="currentPost.category">
        included in
        <a
          :href="`/categories/${currentPost.category}`"
          class="flex items-center gap-1 text-zinc-700 dark:text-zinc-400 ml-1 hover:text-zinc-800 dark:hover:text-zinc-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="fill-zinc-700 dark:fill-zinc-400">
            <path
              d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"
            />
          </svg>
          {{ currentPost.category }}
        </a>
      </span>
    </div>

    <div class="flex">
      <span class="flex items-center gap-1 text-sm text-zinc-400 dark:text-zinc-600 self-end">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" class="fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
          />
        </svg>
        <time :datetime="currentPost.pubDate" class="ml-1">
          {{
            new Date(currentPost.pubDate).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }}
        </time>
      </span>

      <span class="flex items-center gap-1 ml-3 text-sm text-zinc-400 dark:text-zinc-600">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
          />
        </svg>
        {{ currentPost.readingTime.words }} words
      </span>

      <span class="flex items-center gap-1 ml-3 text-sm text-zinc-400 dark:text-zinc-600">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
          />
        </svg>
        {{ currentPost.readingTime.text }} minutes
      </span>
    </div>

    <div class="flex">
      <div class="w-3/4 content">
        <img :src="currentPost.featuredImage" class="object-cover my-2 w-full max-h-96" />
        <div class="content mb-8">
          <ContentDoc>
            <template #not-found>
              <h1>Article not found, return to blog page</h1>
            </template>
          </ContentDoc>
        </div>

        <Giscus
          id="comments"
          repo="nirgn975/portfolio"
          repoId="MDEwOlJlcG9zaXRvcnk2MDg0NTI1OA=="
          category="Comments"
          categoryId="DIC_kwDOA6Bsys4CSNJU-hVS"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="transparent_dark"
          lang="en"
          loading="lazy"
        />
      </div>

      <div class="w-1/4 sticky top-24 h-fit mt-2 ml-4 pl-4 border-l-4 border-zinc-300 dark:border-zinc-700">
        <p class="text-lg font-semibold mb-2">CONTENTS</p>
        <a
          :href="`#${tocText.id}`"
          class="block my-1 hover:text-sky-500"
          style="{`padding-left:"
          ${(Number(header.depth)
          -
          2)
          *
          1.25}rem`}
          v-for="(tocText, tocIndex) of currentPost.body?.toc?.links"
          :key="tocIndex"
        >
          {{ tocText.text }}
        </a>
      </div>
    </div>

    <hr class="my-12 w-3/4 border-2 border-zinc-300 dark:border-zinc-700" />

    <div class="w-3/4">
      <h3 class="mb-2 text-xl font-bold">📖 You might also like</h3>
      <div class="flex gap-4">
        <ArticleCard :post="mightLikePosts[0]" />
        <ArticleCard :post="mightLikePosts[1]" />
      </div>
    </div>
  </article>
</template>

<style is:global>
/* 
.content img {
  @apply m-4 mx-auto rounded-sm;
}

.content p {
  @apply my-2;
}

.content h2 {
  @apply text-2xl mt-5 mb-3 font-bold;
}

.content h3 {
  @apply text-xl mt-3 mb-2 font-bold;
}

.content h4 {
  @apply text-lg mt-3 mb-2 font-bold;
}

.content :not(pre) > code {
  @apply bg-[#f5f5f5] text-[#e74c3c] px-2;
}

.dark .content :not(pre) > code {
  @apply bg-[#272c34] text-[#e5bf78] px-2;
}

.content a {
  @apply text-[#0ea5e9];
}

.content a:hover {
  @apply text-[#38bdf8];
}

.content code {
  counter-reset: line;
}

.content code > .line::before {
  content: counter(line);
  counter-increment: line;
  @apply inline-block text-right w-4 mr-5 text-zinc-600;
}

.content pre.language-bash code > .line::before {
  content: "$";
}

.content pre.shiki {
  @apply rounded-t-md pl-4 text-zinc-800 dark:text-zinc-300 py-2 font-semibold bg-[#c8c8ff0d];
}

.content pre.shiki::before {
  content: url("/terminal-dots.svg");
  @apply mr-8 pt-2;
}

.content pre.shiki {
  @apply relative rounded-b-md m-0 bg-[#c8c8ff0d];
}

.content pre.shiki code {
  @apply flex flex-col overflow-x-scroll pb-2;
}

.content pre.shiki .highlighted {
  @apply bg-[#c8c8ff1a] border-l-[#60a5fa];
}

.content pre.shiki:after {
  @apply absolute right-3 top-2 text-zinc-600;
  content: attr(data-language);
}

.content table {
  @apply block overflow-x-scroll;
}

.content table th {
  @apply border border-gray-300 p-2;
}

.dark .content table th {
  @apply border-neutral-900;
}

.content table td {
  @apply border border-gray-300 p-2;
}

.dark .content table td {
  @apply border-neutral-900;
}

.content table > thead {
  @apply bg-gray-200;
}

.dark .content table > thead {
  @apply bg-gray-900;
}

.content table > tbody {
  @apply bg-gray-100;
}

.dark .content table > tbody {
  @apply bg-gray-800;
}

.content svg {
  margin: 0 auto;
}

.content blockquote {
  @apply bg-gray-200 p-2 border-l-8 border-l-sky-500;
}

.dark .content blockquote {
  @apply bg-gray-700;
} */
</style>
