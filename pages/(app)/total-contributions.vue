<script lang="ts" setup>
import type { RankedUser } from "~/types";

definePageMeta({
  middleware: "auth",
});

const { data: topUsers } = await useFetch<RankedUser[]>(
  "/api/top-users-by-total-contributions",
);
</script>

<template>
  <AuthentifiedComponent>
    <RankCard
      v-if="topUsers"
      :users="topUsers"
      rank-key="totalContributions"
      title="Total contributions"
    />
  </AuthentifiedComponent>
</template>
