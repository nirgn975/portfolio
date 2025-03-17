<script setup lang="ts">
const tags = [
  { label: "software development", icon: "i-heroicons-computer-desktop" },
  { label: "hacking", icon: "i-heroicons-command-line" },
  { label: "indie hackers", icon: "i-heroicons-rocket-launch" },
  { label: "open source", icon: "i-heroicons-beaker" },
  { label: "tutorials", icon: "i-heroicons-academic-cap" },
  { label: "solopreneur", icon: "i-heroicons-bolt" },
  { label: "tech stuff", icon: "i-heroicons-device-phone-mobile" },
  { label: "geek culture", icon: "i-heroicons-gif" },
  { label: "hardware", icon: "i-heroicons-cpu-chip" },
];
</script>

<template>
  <div class="h-[630px] w-[1200px] relative isolate overflow-hidden p-4 bg-gray-950 ring-1 ring-gray-500">
    <div class="pt-14 pb-4 flex gap-4 items-center h-1/2 px-6 space-x-10">
      <img src="/avatar.webp" class="size-52 rounded-full bg-gray-100 p-2" />
      <div class="text-pretty flex flex-col justify-evenly h-full py-10 space-y-2">
        <h1 class="text-6xl text-gray-50">Nir Galon</h1>
        <div class="flex gap-8 items-center">
          <UIcon name="i-simple-icons-github" class="size-7 text-gray-50" />
          <UIcon name="i-simple-icons-x" class="size-7 text-gray-50" />
          <UIcon name="i-simple-icons-linkedin" class="size-7 text-gray-50" />
          <UIcon name="i-simple-icons-stackoverflow" class="size-7 text-gray-50" />
          <p class="text-gray-50 text-2xl">https://nir.galons.io</p>
        </div>
      </div>
    </div>

    <div class="px-6">
      <div class="text-pretty flex flex-col justify-evenly h-full px-2 py-10 space-y-1">
        <h2 class="text-4xl text-gray-400"><q>All you need to succeed is a laptop and determination</q></h2>
      </div>

      <div class="flex gap-10 items-center justify-evenly flex-wrap">
        <UBadge v-for="(tag, index) of tags" :key="index" size="xl" color="neutral" variant="solid" :icon="tag.icon">#{{ tag.label }}</UBadge>
      </div>
    </div>
  </div>
</template>
