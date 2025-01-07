<script lang="ts" setup>
import { Loader2 } from "lucide-vue-next";
import type { RankedUser } from "~/types";

const user = useUser();

const topUsersByFollowers = useState<RankedUser[]>(
  "topUsersByFollowers",
  () => [],
);
const topUsersByPublicContributions = useState<RankedUser[]>(
  "topUsersByPublicContributions",
  () => [],
);
const topUsersByTotalContributions = useState<RankedUser[]>(
  "topUsersByTotalContributions",
  () => [],
);
const extraUsersByFollowers = useState<RankedUser[]>(
  "extraUsersByFollowers",
  () => [],
);
const extraUsersByPublicContributions = useState<RankedUser[]>(
  "extraUsersByPublicContributions",
  () => [],
);
const extraUsersByTotalContributions = useState<RankedUser[]>(
  "extraUsersByTotalContributions",
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
    // Assign top users
    topUsersByFollowers.value = data.followers;
    topUsersByTotalContributions.value = data.total_contributions;
    topUsersByPublicContributions.value = data.public_contributions;
    // Assign extra users
    extraUsersByFollowers.value = data.extra_users_by_followers;
    extraUsersByTotalContributions.value =
      data.extra_users_by_total_contributions;
    extraUsersByPublicContributions.value =
      data.extra_users_by_public_contributions;
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
          :extra-users="extraUsersByPublicContributions"
          :users="topUsersByPublicContributions"
          rank-key="publicContributions"
          title="Public contributions"
        />
        <RankCard
          :extra-users="extraUsersByTotalContributions"
          :users="topUsersByTotalContributions"
          rank-key="totalContributions"
          title="Total contributions"
        />
        <RankCard
          :extra-users="extraUsersByFollowers"
          :users="topUsersByFollowers"
          class="md:col-span-2"
          rank-key="followers"
          title="Followers"
        />
      </div>
    </div>
  </section>
</template>
