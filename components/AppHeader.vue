<script setup lang="ts">
const mobileMenu = ref(false);
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between md:items-center p-4">
    <div class="flex justify-between items-center">
      <a href="/">
        <span class="sr-only">Nir Galon</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-10 w-10 fill-zinc-700 dark:fill-zinc-400">
          <path
            d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"
          />
        </svg>
      </a>

      <span @click="mobileMenu = !mobileMenu" class="md:hidden">
        <svg
          v-if="!mobileMenu"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-8 w-8 fill-zinc-700 dark:fill-zinc-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </span>
    </div>
    <div class="space-y-4 py-2 md:py-0 mt-2 md:mt-2 md:space-y-0 md:ml-10 md:space-x-8 hidden md:flex items-center border-t-2 md:border-t-0 border-zinc-800">
      <div class="md:hidden">
        <div class="relative mt-1 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <i class="fa-regular fa-magnifying-glass"></i>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            class="w-full rounded-md pl-10 py-2 px-4 bg-zinc-200 dark:bg-zinc-700 border-transparent focus:border-zinc-50 focus:dark:border-zinc-800 focus:ring-zinc-50 focus:dark:ring-zinc-800"
            placeholder="Search titles or content"
          />
        </div>
      </div>

      <a href="/blog" class="text-base font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-300 block md:inline-block">Blog</a>

      <a href="/categories" class="text-base font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-300 block md:inline-block"
        >Categories</a
      >

      <a href="/about" class="text-base font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-300 block md:inline-block"
        >About</a
      >

      <a href="/contact" class="text-base font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-300 block md:inline-block"
        >Contact</a
      >

      <UButton size="sm" color="primary" square variant="ghost" @click="isDark = !isDark">
        <template #leading>
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        </template>
      </UButton>
    </div>
  </div>
</template>
