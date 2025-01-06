<script lang="ts" setup>
import { Loader2 } from "lucide-vue-next";
import type { RankUser } from "~/types";

const user = useUser();

const topUsersByFollowers = useState<RankUser[]>(
  "topUsersByFollowers",
  () => [],
);
const topUsersByPublicContributions = useState<RankUser[]>(
  "topUsersByPublicContributions",
  () => [],
);
const topUsersByTotalContributions = useState<RankUser[]>(
  "topUsersByTotalContributions",
  () => [],
);

definePageMeta({
  middleware: "auth",
});

onMounted(() => {
  if (!user.value) {
    $fetch("/api/whoami").then((userData) => {
      user.value = userData;
    });
  }

  $fetch("/api/top-users").then((data) => {
    topUsersByFollowers.value = data.followers;
    topUsersByTotalContributions.value = data.total_contributions;
    topUsersByPublicContributions.value = data.public_contributions;
  });
});
</script>

<template>
  <section class="mx-auto h-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div v-if="!user" class="flex h-full items-center justify-center">
      <Loader2 class="animate-spin" />
    </div>

    <div v-else class="flex flex-col items-center gap-8">
      <ProfileCard :user-profile="user" class="w-full max-w-xs" />
      <div class="flex w-full flex-col gap-4">
        <RankCard
          :users="topUsersByPublicContributions"
          rank-key="publicContributions"
          title="Public contributions"
        />
        <RankCard
          :users="topUsersByTotalContributions"
          rank-key="totalContributions"
          title="Total contributions"
        />
        <RankCard
          :users="topUsersByFollowers"
          rank-key="followers"
          title="Followers"
        />
      </div>
    </div>
  </section>
</template>
