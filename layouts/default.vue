<template>
  <div class="flex flex-col h-full">
    <header class="bg-zinc-100 dark:bg-zinc-900 fixed w-full z-10">
      <nav class="mx-auto max-w-7xl">
        <AppHeader />
      </nav>
    </header>

    <main class="flex-1 px-4 mt-20">
      <section class="mx-auto max-w-7xl">
        <NuxtPage />
      </section>
    </main>

    <footer>
      <section class="mx-auto max-w-7xl">
        <AppFooter />
      </section>
    </footer>
  </div>
</template>
