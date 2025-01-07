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
