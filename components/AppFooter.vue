<template>
  <header class="bg-background/75 backdrop-blur">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8"
    >
      <div class="flex items-center gap-2">
        <AppName />
        <div class="text-xs text-black/40 dark:text-white/40">
          crafted with ❤️ by &nbsp;
          <NuxtLink
            to="https://lovanirina.vercel.app/"
            target="_blank"
            class="underline"
            >Ryuka</NuxtLink
          >
        </div>
      </div>
      <div class="text-center text-xs text-black/40 dark:text-white/40">
        © Copyright 2025 Antananarivo. All rights reserved.
      </div>
    </div>
  </header>
</template>
