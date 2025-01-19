<script lang="ts" setup>
import type { RankedUser } from "~/types";
import { ExternalLink } from "lucide-vue-next";

const {
  title,
  users,
  rankKey,
  link = "",
  extraUsers = [],
} = defineProps<{
  title: string;
  users: RankedUser[];
  rankKey: keyof RankedUser;
  link?: string;
  extraUsers?: RankedUser[];
}>();

const router = useRouter();
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle
        class="flex items-center justify-between gap-2 text-lg text-primary"
      >
        {{ title }}
        <NuxtLink v-if="link" :to="link">
          <ExternalLink class="size-5" />
        </NuxtLink>
      </CardTitle>
    </CardHeader>
    <CardContent class="grid gap-1 p-0 text-xs">
      <RankCardItem
        v-for="user in users"
        :key="user.login"
        :rank-key="rankKey"
        :user="user"
        class="p-6"
      />
      <template v-if="extraUsers.length">
        <div class="px-6">
          <Separator />
        </div>
        <RankCardItem
          v-for="user in extraUsers"
          :key="user.login"
          :rank-key="rankKey"
          :user="user"
          class="p-6"
        />
      </template>
    </CardContent>
  </Card>
</template>
