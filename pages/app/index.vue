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

  $fetch("/api/top-10-users").then((data) => {
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

    <div v-else class="flex flex-col gap-8 lg:flex-row">
      <ProfileCard
        :user-profile="user"
        class="w-full max-w-xs self-center lg:self-start"
      />
      <div class="grid w-full gap-4 md:grid-cols-2">
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
          class="md:col-span-2"
          rank-key="followers"
          title="Followers"
        />
      </div>
    </div>
  </section>
</template>
