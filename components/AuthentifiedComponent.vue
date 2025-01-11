<script lang="ts" setup>
import { Loader2 } from "lucide-vue-next";

const user = useUser();

onMounted(() => {
  if (!user.value) {
    $fetch("/api/auth/whoami").then((userData) => {
      user.value = userData;
    });
  }
});
</script>

<template>
  <section class="mx-auto h-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div v-if="!user" class="flex h-full items-center justify-center">
      <Loader2 class="animate-spin" />
    </div>
    <slot v-else></slot>
  </section>
</template>
