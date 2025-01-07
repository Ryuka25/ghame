<script lang="ts" setup>
import type { RankedUser } from "~/types";
import { Globe, GlobeLock, UsersRound } from "lucide-vue-next";

const { title, users, rankKey } = defineProps<{
  title: string;
  users: RankedUser[];
  rankKey: keyof RankedUser;
}>();
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-lg text-primary">
        <Globe v-if="rankKey == 'publicContributions'" />
        <GlobeLock v-if="rankKey == 'totalContributions'" />
        <UsersRound v-if="rankKey == 'followers'" />
        <span>{{ title }}</span>
      </CardTitle>
    </CardHeader>
    <CardContent class="grid gap-2 text-xs">
      <RankCardItem
        v-for="(user, index) in users"
        :key="user.login"
        :rank="index + 1"
        :rank-key="rankKey"
        :user="user"
      />
    </CardContent>
  </Card>
</template>
