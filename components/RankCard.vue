<script lang="ts" setup>
import type { RankedUser } from "~/types";
import { Globe, GlobeLock, UsersRound } from "lucide-vue-next";

const { title, users, rankKey, extraUsers } = defineProps<{
  title: string;
  users: RankedUser[];
  rankKey: keyof RankedUser;
  extraUsers: RankedUser[];
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
        v-for="user in users"
        :key="user.login"
        :rank-key="rankKey"
        :user="user"
      />
      <template v-if="extraUsers.length">
        <Separator />
        <RankCardItem
          v-for="user in extraUsers"
          :key="user.login"
          :rank-key="rankKey"
          :user="user"
        />
      </template>
    </CardContent>
  </Card>
</template>
