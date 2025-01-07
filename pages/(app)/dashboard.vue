<script lang="ts" setup>
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

onMounted(() => {
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
  <AuthentifiedComponent>
    <div class="flex flex-col gap-8 lg:flex-row">
      <ProfileCard
        v-if="user"
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
  </AuthentifiedComponent>
</template>
