<template>
  <USeparator class="h-px" />

  <UFooter :ui="{ top: 'border-b border-[var(--ui-border)]' }">
    <template #left>
      <p class="text-(--ui-text-muted) text-sm">Copyright © {{ new Date().getFullYear() }}. All rights reserved.</p>
    </template>

    <template #right>
      <UButton to="https://github.com/nirgn975" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="neutral" variant="ghost" />
      <UButton to="https://x.com/nirgn975" target="_blank" icon="i-simple-icons-x" aria-label="X/Twitter" color="neutral" variant="ghost" />
      <UButton to="https://linkedin.com/in/nirgn" target="_blank" icon="i-simple-icons-linkedin" aria-label="LinkedIN" color="neutral" variant="ghost" />
      <UButton
        to="https://stackoverflow.com/users/2040160/nirgn"
        target="_blank"
        icon="i-simple-icons-stackoverflow"
        aria-label="StackOverflow"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
