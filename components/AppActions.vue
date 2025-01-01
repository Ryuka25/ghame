<script lang="ts" setup>
import { APP_GITHUB_LINK } from "~/lib/app";
</script>

<template>
  <div class="flex gap-2">
    <AppToogleModeButton />
    <AppGithubButton v-if="APP_GITHUB_LINK" :link="APP_GITHUB_LINK" />
  </div>
</template>
