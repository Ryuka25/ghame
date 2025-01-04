<script lang="ts" setup>
const user = useUser();
const router = useRouter();

onMounted(() => {
  const storedUsername = localStorage.getItem("username");
  if (!storedUsername) {
    navigateTo({
      path: "/",
      query: { next: router.currentRoute.value.path },
      replace: true,
    });
  }

  if (!user.value) {
    $fetch("/api/fetch-user/", {
      query: {
        username: storedUsername,
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
    <ProfileCard v-if="user" class="w-full max-w-sm" :user-profile="user" />
    <div v-else>Waiting for user data...</div>
  </section>
</template>
