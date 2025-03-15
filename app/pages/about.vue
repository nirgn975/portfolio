<script setup lang="ts">
const { data } = await useAsyncData("about", () => queryCollection("about").first());

useSeoMeta({
  title: data.value?.title,
  ogTitle: data.value?.title,
  description: data.value?.description,
  ogDescription: data.value?.description,
});

// defineOgImageComponent("Saas");

let repos: Array<{ code: string; title: string; name: string; description: string; url: string; stars: string; forks: string }> = [];
for (const [index, repo] of data.value?.projects.items.entries()) {
  const { data } = await useFetch<Record<string, any>>(`https://api.github.com/repos/nirgn975/${repo.code}`);
  repos[index] = {
    ...repo,
    name: data.value?.name,
    description: data.value?.description,
    url: data.value?.html_url,
    stars: data.value?.stargazers_count,
    forks: data.value?.forks,
  };
}

repos = repos.sort((a, b) => Number(b.stars) - Number(a.stars));
</script>

<template>
  <section class="divide-y divide-gray-300 dark:divide-gray-700 max-w-7xl mx-auto">
    <!-- About Me -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <span class="h-8 w-8 fill-gray-700 dark:fill-gray-400" v-html="data?.aboutMe.icon"></span>
        <h2 class="font-medium text-3xl">{{ data?.aboutMe.title }}</h2>
      </div>
      <p class="mb-4">{{ data?.aboutMe.description }}</p>
      <ul class="list-disc pl-6">
        <li v-for="(item, index) of data?.aboutMe.items" :key="index">{{ item }}</li>
      </ul>
    </div>

    <!-- Work -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <span class="h-8 w-8 fill-gray-700 dark:fill-gray-400" v-html="data?.work.icon"></span>
        <h2 class="font-medium text-3xl">{{ data?.work.title }}</h2>
      </div>

      <div class="pt-4 pl-6">
        <div class="pt-4 pb-8 px-6 border-l-2 border-gray-700 dark:border-gray-400" v-for="(work, index) of data?.work.items" :key="index">
          <time
            class="relative before:h-5 before:w-5 before:absolute before:rounded-full before:border-2 before:border-gray-700 dark:before:border-gray-400 before:bg-gray-50 dark:before:bg-gray-950 before:-left-9 before:content-['']"
          >
            {{ work.start_date }} - {{ work.end_date }}
          </time>
          <h3 class="text-xl mt-2 mb-4">
            {{ work.title }} @
            <a :href="work.company.url" target="_blank" class="text-sky-500 hover:text-sky-400"> {{ work.company.name }} </a>
          </h3>
          <ul class="list-disc pl-6">
            <li v-for="(item, itemIndex) of work.items" :key="itemIndex">
              <p v-html="item"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <span class="h-8 w-8 fill-gray-700 dark:fill-gray-400" v-html="data?.education.icon"></span>
        <h2 class="font-medium text-3xl">{{ data?.education.title }}</h2>
      </div>

      <div class="pt-4 pl-6">
        <div class="pt-4 pb-8 px-6 border-l-2 border-gray-700 dark:border-gray-400" v-for="(education, index) of data?.education.items" :key="index">
          <time
            class="relative before:h-5 before:w-5 before:absolute before:rounded-full before:border-2 before:border-gray-700 dark:before:border-gray-400 before:bg-gray-50 dark:before:bg-gray-950 before:-left-9 before:content-['']"
          >
            {{ education.start_date }} - {{ education.end_date }}
          </time>
          <h3 class="text-xl mt-2 mb-4">
            {{ education.title }} @
            <a :href="education.university.url" target="_blank" class="text-sky-500 hover:text-sky-400">{{ education.university.name }}</a>
          </h3>
          <ul class="list-disc pl-6">
            <li v-for="(item, itemIndex) of education.items" :key="itemIndex">
              <p v-html="item"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <span class="h-8 w-8 fill-gray-700 dark:fill-gray-400" v-html="data?.skills.icon"></span>
        <h2 class="font-medium text-3xl">{{ data?.skills.title }}</h2>
      </div>

      <div class="mt-6" v-for="(skill, index) of data?.skills.items" :key="index">
        <h3 class="text-xl my-2">{{ skill.title }}</h3>
        <div class="ml-4 flex flex-wrap gap-2">
          <span class="ml-4 flex items-center" v-for="(item, itemIndex) of skill.items" :key="itemIndex">
            <span v-html="item.icon" class="h-5 w-5 mr-1 fill-gray-700 dark:fill-gray-400"></span>
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <span class="h-8 w-8 fill-gray-700 dark:fill-gray-400" v-html="data?.projects.icon"></span>
        <h2 class="font-medium text-3xl">{{ data?.projects.title }}</h2>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div class="flex flex-col bg-gray-200 dark:bg-gray-700 rounded-md" v-for="(repo, index) of repos" :key="index">
          <a :href="repo.url" target="_blank" class="p-4">
            <h3 class="text-lg font-medium">{{ repo.name }}</h3>
          </a>

          <a :href="repo.url" target="_blank"> <img :src="`/about/projects/${repo.code}.webp`" class="w-full" /> </a>

          <p class="p-4 flex-1">{{ repo.description }}</p>

          <div class="flex justify-between p-4 border-t border-gray-700 dark:border-gray-400">
            <span class="flex gap-1 items-center fill-gray-700 dark:fill-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                <path
                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                />
              </svg>
              {{ repo.stars }}
            </span>
            <span class="flex gap-1 items-center fill-gray-700 dark:fill-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path
                  d="M80 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32.4 97.2c28-12.4 47.6-40.5 47.6-73.2c0-44.2-35.8-80-80-80S0 35.8 0 80c0 32.8 19.7 61 48 73.3V358.7C19.7 371 0 399.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V272c26.7 20.1 60 32 96 32h86.7c12.3 28.3 40.5 48 73.3 48c44.2 0 80-35.8 80-80s-35.8-80-80-80c-32.8 0-61 19.7-73.3 48H208c-49.9 0-91-38.1-95.6-86.8zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM344 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                />
              </svg>
              {{ repo.forks }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Talks -->
    <div class="py-6">
      <div class="flex items-center gap-2 my-2">
        <span class="h-8 w-8 fill-gray-700 dark:fill-gray-400" v-html="data?.talks.icon"></span>
        <h2 class="font-medium text-3xl">{{ data?.talks.title }}</h2>
      </div>

      <div class="mt-4">
        <div class="flex flex-col md:flex-row" v-for="(talk, index) of data?.talks.items" :key="index">
          <img :src="talk.image" alt="Talk Thumbnail" class="my-2 rounded-md" />
          <div class="p-4">
            <h3 class="text-2xl">{{ talk.title }}</h3>
            <p class="pt-2">
              <time>{{ talk.date }}</time> |
              <span> <a :href="talk.meetup_url" target="_blank" rel="noreferrer" class="text-sky-500 hover:text-sky-400"> Meetpup Page </a> | </span>
              <span>
                <a :href="talk.download_url" target="_blank" rel="noreferrer" class="text-sky-500 hover:text-sky-400"> Download </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
