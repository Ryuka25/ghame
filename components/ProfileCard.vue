<script setup lang="ts">
const props = defineProps<{
  user: {
    name: string;
    login: string;
    avatarUrl: string;
    location: string;
  };
}>();
</script>

<template>
  <Card class="mt-16">
    <CardContent>
      <div class="relative flex flex-col items-center gap-4">
        <Avatar class="absolute -top-16 size-32">
          <AvatarImage :src="user.avatarUrl" :alt="user.login" />
          <AvatarFallback>GH</AvatarFallback>
        </Avatar>
        <div class="mt-20 grid gap-1 text-center">
          <p class="text-md font-medium leading-none">
            <span v-if="user.name">{{ user.name }} ({{ user.login }})</span>
            <span v-else>{{ user.login }}</span>
          </p>
          <p class="text-sm text-muted-foreground">{{ user.location }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
