<script lang="ts" setup>
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_PREVIEW_IMAGE,
  APP_TITLE,
} from "./lib/app";

useSeoMeta({
  title: APP_NAME,
  ogTitle: APP_TITLE,
  twitterTitle: APP_TITLE,
  description: APP_DESCRIPTION,
  ogDescription: APP_DESCRIPTION,
  twitterDescription: APP_DESCRIPTION,
  ogImage: APP_PREVIEW_IMAGE,
  twitterImage: APP_PREVIEW_IMAGE,
  twitterCard: "summary_large_image",
});

useHead({
  bodyAttrs: {
    class: "cursor-[url(/misc/cursor.png),auto]",
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
