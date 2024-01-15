<script setup lang="ts"></script>

<template>
  <div class="mt-8 mx-auto max-w-4xl">
    <p class="pb-2">Hi!<br />My name is Nir Galon, I'm a geek who always want to learn new things. I work as a software engineer and I love what I do!</p>
    <p class="pb-2">
      To learn more about me you can visit my <a href="/about" class="text-sky-500 hover:text-sky-400">about page</a> or just follow me on
      <a href="https://twitter.com/nirgn975" target="_blank" class="text-sky-500 hover:text-sky-400">twitter</a> or
      <a href="https://github.com/nirgn975" target="_blank" class="text-sky-500 hover:text-sky-400">github</a>. If you wish to contact me, the best way is to
      just drop a message below.
    </p>

    <form
      name="contact"
      class="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
      action="https://getform.io/f/75c12049-9fa0-4eff-a3e7-78a02f36cbff"
      method="POST"
    >
      <div>
        <label for="first-name" class="text-sm font-medium text-zinc-700 dark:text-zinc-400">First name</label>
        <div class="mt-1">
          <input
            type="text"
            name="first-name"
            id="first-name"
            autocomplete="given-name"
            class="w-full rounded-md py-2 px-4 bg-zinc-200 dark:bg-zinc-700 border-transparent focus:border-zinc-50 focus:dark:border-zinc-800 focus:ring-zinc-50 focus:dark:ring-zinc-800"
          />
        </div>
      </div>
      <div>
        <label for="last-name" class="text-sm font-medium text-zinc-700 dark:text-zinc-400">Last name</label>
        <div class="mt-1">
          <input
            type="text"
            name="last-name"
            id="last-name"
            autocomplete="family-name"
            class="w-full rounded-md py-2 px-4 bg-zinc-200 dark:bg-zinc-700 border-transparent focus:border-zinc-50 focus:dark:border-zinc-800 focus:ring-zinc-50 focus:dark:ring-zinc-800"
          />
        </div>
      </div>

      <div class="sm:col-span-2">
        <label for="email" class="text-sm font-medium text-zinc-700 dark:text-zinc-400">Email</label>
        <div class="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            class="w-full rounded-md py-2 px-4 bg-zinc-200 dark:bg-zinc-700 border-transparent focus:border-zinc-50 focus:dark:border-zinc-800 focus:ring-zinc-50 focus:dark:ring-zinc-800"
          />
        </div>
      </div>

      <div class="sm:col-span-2">
        <label for="message" class="text-sm font-medium text-zinc-700 dark:text-zinc-400">Message</label>
        <div class="mt-1">
          <textarea
            id="message"
            name="message"
            rows="4"
            class="w-full rounded-md py-2 px-4 bg-zinc-200 dark:bg-zinc-700 border-transparent focus:border-zinc-50 focus:dark:border-zinc-800 focus:ring-zinc-50 focus:dark:ring-zinc-800"
          ></textarea>
        </div>
      </div>

      <div class="sm:col-span-2">
        <button
          type="submit"
          class="inline-flex w-full items-center justify-center rounded-md border-transparent bg-sky-500 hover:bg-sky-400 px-6 py-3 font-medium text-zinc-700"
        >
          Let's talk
        </button>
      </div>
    </form>
  </div>
</template>
