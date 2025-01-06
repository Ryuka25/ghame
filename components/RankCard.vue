<script lang="ts" setup>
import type { RankUser } from "~/types";

const { title, users, rankKey } = defineProps<{
  title: string;
  users: RankUser[];
  rankKey: keyof RankUser;
}>();
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle class="text-lg">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <ul class="grid gap-2">
        <li
          v-for="(user, index) in users"
          :key="user.login"
          class="flex items-center"
        >
          <RankNumber :number="index + 1" class="" />
          <Avatar class="ml-2 size-8">
            <AvatarImage :src="user.avatarUrl" />
            <AvatarFallback>{{ user.login }}</AvatarFallback>
          </Avatar>
          <div class="ml-2 flex-1 font-semibold md:ml-4">{{ user.login }}</div>
          <div class="inline-flex">{{ user[rankKey] }}</div>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
