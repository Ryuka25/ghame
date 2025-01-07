<script lang="ts" setup>
import type { User } from "~/types";

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
      </div>
    </CardContent>
  </Card>
</template>
