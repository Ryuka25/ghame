<script lang="ts" setup>
import { LayoutDashboard, LogOut } from "lucide-vue-next";

const storedUsername = useCookie("username");
const router = useRouter();
const user = useUser();

if (storedUsername.value && !user.value) {
  const { data } = await useFetch("/api/whoami", { lazy: true });
  user.value = data.value;
}
</script>

<template>
  <template v-if="user">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button class="relative h-8 w-8 rounded-full" variant="ghost">
          <Avatar class="h-8 w-8">
            <AvatarImage :alt="user.login" :src="user.avatarUrl" />
            <AvatarFallback>{{ user.initial }}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-56">
        <DropdownMenuLabel class="flex gap-2 font-normal">
          <Avatar class="h-8 w-8">
            <AvatarImage :alt="user.login" :src="user.avatarUrl" />
            <AvatarFallback>{{ user.initial }}</AvatarFallback>
          </Avatar>

          <div class="flex flex-col space-y-1">
            <p class="line-clamp-1 text-sm font-medium leading-none">
              {{ user.login }}
            </p>
            <p
              v-if="user.name"
              class="line-clamp-1 text-xs leading-none text-muted-foreground"
            >
              {{ user.name }}
            </p>
            <p
              v-else
              class="line-clamp-1 text-xs leading-none text-muted-foreground"
            >
              {{ user.location }}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem as-child>
            <NuxtLink
              :to="{
                path: '/dashboard',
              }"
            >
              <LayoutDashboard class="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem as-child>
          <NuxtLink
            :to="{
              path: '/logout',
              query: { next: router.currentRoute.value.path },
            }"
          >
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </template>
  <template v-else>
    <NuxtLink
      :to="{
        path: '/',
      }"
    >
      <Button>Log In</Button>
    </NuxtLink>
  </template>
</template>
