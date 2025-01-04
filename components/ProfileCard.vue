<script setup lang="ts">
import { LogOut } from "lucide-vue-next";

const props = defineProps<{
  userProfile: {
    name: string;
    login: string;
    avatarUrl: string;
    location: string;
  };
}>();

const storedUsername = useCookie("username");
const user = useUser();

const logout = () => {
  // remove user data
  storedUsername.value = null;
  user.value = null;

  navigateTo({ path: "/" });
};
</script>

<template>
  <Card class="mt-16">
    <CardContent>
      <div class="relative flex flex-col items-center gap-4">
        <Avatar class="absolute -top-16 size-32">
          <AvatarImage :src="userProfile.avatarUrl" :alt="userProfile.login" />
          <AvatarFallback>GH</AvatarFallback>
        </Avatar>
        <div class="mt-20 grid gap-1 text-center">
          <p class="text-md font-medium leading-none">
            <span v-if="userProfile.name"
              >{{ userProfile.name }} ({{ userProfile.login }})</span
            >
            <span v-else>{{ userProfile.login }}</span>
          </p>
          <p class="text-sm text-muted-foreground">
            {{ userProfile.location }}
          </p>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full" @click="logout">
        <LogOut />
        Logout
      </Button>
    </CardFooter>
  </Card>
</template>
