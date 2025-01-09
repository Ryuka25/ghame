<script lang="ts" setup>
import type { RankedUser } from "~/types";

const { data: topUsers } = await useFetch<RankedUser[]>(
  "/api/top-users-by-public-contributions",
);
</script>

<template>
  <section class="mx-auto h-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <RankCard
      v-if="topUsers"
      :users="topUsers"
      rank-key="publicContributions"
      title="Public contributions"
    />
  </section>
</template>
