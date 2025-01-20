<script lang="ts" setup>
import type { User } from "~/types";
import { UserRound } from "lucide-vue-next";

const { user } = defineProps<{
  user: User;
}>();
</script>

<template>
  <Card class="mt-16">
    <CardContent>
      <div class="relative flex flex-col items-center gap-4">
        <Avatar class="absolute -top-16 size-32">
          <AvatarImage :alt="user.login" :src="user.avatarUrl" />
          <AvatarFallback>{{ user.initial }}</AvatarFallback>
        </Avatar>
        <div class="mt-20 grid gap-1 text-center">
          <p class="text-md font-medium leading-none">
            <span v-if="user.name">{{ user.name }} ({{ user.login }})</span>
            <span v-else>{{ user.login }}</span>
          </p>
          <p class="text-sm text-muted-foreground">
            {{ user.location }}
          </p>
        </div>
        <div class="flex h-10 gap-4">
          <div class="flex flex-1 flex-col justify-between gap-1 text-center">
            <div class="text-sm font-medium leading-none">
              {{ user.followers }}
            </div>
            <div class="text-[0.5rem]">Followers</div>
          </div>
          <Separator orientation="vertical" />
          <div class="flex flex-1 flex-col justify-between gap-1 text-center">
            <div class="text-sm font-medium leading-none">
              {{ user.publicContributions }}
            </div>
            <div class="text-[0.5rem]">Public contributions</div>
          </div>
          <Separator orientation="vertical" />
          <div class="flex flex-1 flex-col justify-between gap-1 text-center">
            <div class="text-sm font-medium leading-none">
              {{ user.totalContributions }}
            </div>
            <div class="text-[0.5rem]">Total contributions</div>
          </div>
        </div>
        <Button as-child class="w-full">
          <NuxtLink :to="`/players/${user.login}`">
            <UserRound class="mr-2 h-4 w-4" />
            <span>Show my profile</span>
          </NuxtLink>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
