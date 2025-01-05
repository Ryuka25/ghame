<script lang="ts" setup>
const user = useUser();

definePageMeta({
  middleware: "auth",
});

onMounted(() => {
  const storedUsername = useCookie("username");

  if (!user.value) {
    $fetch("/api/whoami", {
      query: {
        username: storedUsername.value,
      },
    }).then((userData) => {
      user.value = userData;
    });
  }
});
</script>

<template>
  <section
    class="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-4 sm:px-6 lg:flex-row lg:px-8"
  >
    <ProfileCard v-if="user" :user-profile="user" class="w-full max-w-sm" />
    <div v-else>Waiting for user data...</div>
  </section>
</template>
