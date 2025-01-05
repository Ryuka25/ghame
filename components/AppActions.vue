<script lang="ts" setup>
import { APP_GITHUB_LINK } from "~/lib/app";

const storedUsername = useCookie("username");
const user = useUser();

onMounted(() => {
  if (storedUsername.value && !user.value) {
    $fetch("/api/whoami").then((userData) => {
      user.value = userData;
    });
  }
});
</script>

<template>
  <div class="flex gap-2">
    <AppToogleModeButton />
    <AppGithubButton v-if="APP_GITHUB_LINK" :link="APP_GITHUB_LINK" />
    <UserNav v-if="user" :user />
  </div>
</template>
