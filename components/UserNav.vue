<script setup lang="ts">
import { LogOut, Phone } from "lucide-vue-next";
import type { User } from "~/types";

const { user } = defineProps<{
  user: User;
}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage :alt="user.login" :src="user.avatarUrl" />
          <AvatarFallback>AZ</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="flex font-normal">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ user.login }}</p>
          <p
            v-if="user.name"
            class="text-xs leading-none text-muted-foreground"
          >
            {{ user.name }}
          </p>
          <p v-else class="text-xs leading-none text-muted-foreground">
            {{ user.location }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem as-child>
        <NuxtLink to="/logout/">
          <LogOut class="mr-2 h-4 w-4" />
          <span>Log out</span>
        </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
