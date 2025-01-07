<script lang="ts" setup>
import type { RankedUser } from "~/types";

definePageMeta({
  middleware: "auth",
});

const { data: topUsers } = await useFetch<RankedUser[]>(
  "/api/top-users-by-public-contributions",
);
</script>

<template>
  <AuthentifiedComponent>
    <RankCard
      v-if="topUsers"
      :users="topUsers"
      rank-key="publicContributions"
      title="Public contributions"
    />
  </AuthentifiedComponent>
</template>
