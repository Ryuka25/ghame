<script lang="ts" setup>
import type { RankedUser, User } from "~/types";
import { Globe, GlobeLock, UsersRound } from "lucide-vue-next";

const { user, rank, rankKey } = defineProps<{
  user: RankedUser;
  rankKey: keyof RankedUser;
}>();

const isActive = ref(false);
const currentUser = useUser();

function userHasName(user: User) {
  return user.name && !(user.name == "undefined value");
}

onMounted(() => {
  if (currentUser.value && currentUser.value.login === user.login) {
    isActive.value = true;
  }
});
</script>

<template>
  <div
    :class="[isActive ? 'text-primary' : '']"
    class="flex items-center gap-2 py-1"
  >
    <RankNumber :number="user.rank" />
    <Avatar :class="[isActive ? 'border-2 border-primary' : '']" class="size-8">
      <AvatarImage :src="user.avatarUrl" />
      <AvatarFallback>{{ user.login }}</AvatarFallback>
    </Avatar>
    <div class="flex flex-1 flex-col justify-center md:ml-4">
      <div
        v-if="userHasName(user)"
        class="line-clamp-1 break-all font-semibold"
      >
        {{ user.name }}
      </div>
      <div class="line-clamp-1 break-all font-light">
        {{ user.login }}
      </div>
    </div>
    <div class="flex items-center gap-1">
      {{ user[rankKey] }}
      <UsersRound v-if="rankKey == 'followers'" class="size-4 font-light" />
      <Globe
        v-if="rankKey == 'publicContributions'"
        class="size-4 font-light"
      />
      <GlobeLock
        v-if="rankKey == 'totalContributions'"
        class="size-4 font-light"
      />
    </div>
  </div>
</template>

<style scoped></style>
