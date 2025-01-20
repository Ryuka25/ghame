<script lang="ts" setup>
import { Building2, MapPin, Swords } from "lucide-vue-next";

const route = useRoute();

const username = route.params.username as string;

const {
  data: user,
  error,
  status,
} = await useFetch(`/api/players/${username}`, {
  lazy: true,
});

const colorMode = useColorMode();

function buildActivityGraphLink(username: string) {
  const bgColor = "transparent";
  const color = "e11d48";
  const lineColor = "e11d48";
  const pointColor = colorMode.value == "dark" ? "fff" : "000";
  return `https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=${bgColor}&color=${color}&line=${lineColor}&point=${pointColor}&area=true&hide_border=true`;
}

function buildCurrentlyWorkingOnGraphLink(userId: number) {
  return `https://next.ossinsight.io/widgets/official/compose-currently-working-on/thumbnail.png?user_id=${userId}&activity_type=all&image_size=auto&color_scheme=${colorMode.value}`;
}

function buildUserDashboardStatsGraphLink(userId: number) {
  return `https://next.ossinsight.io/widgets/official/compose-user-dashboard-stats/thumbnail.png?user_id=${userId}&activity_type=all&image_size=auto&color_scheme=${colorMode.value}`;
}
</script>

<template>
  <section class="mx-auto h-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div class="flex justify-center">
      <div
        v-if="status === 'success' && user"
        class="flex w-full flex-col items-center gap-4"
      >
        <a :href="user.avatarUrl ?? '#'" target="_blank">
          <Avatar class="size-32">
            <AvatarImage :alt="user.login" :src="user.avatarUrl" />
            <AvatarFallback>{{ user.initial }}</AvatarFallback>
          </Avatar>
        </a>
        <div class="grid gap-1 text-center">
          <p v-if="user.name" class="text-md font-medium leading-none">
            {{ user.name }}
          </p>
          <p class="text-sm text-muted-foreground">{{ user.login }}</p>
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
        <div class="flex w-full flex-col gap-2 md:flex-row">
          <Button class="flex-1">
            <Swords class="mr-2 h-4 w-4" />
            Challenge
          </Button>
          <Button as-child variant="secondary">
            <a :href="(user.url as string) ?? '#'" target="_blank">
              <Icon class="mr-2 h-4 w-4" name="simple-icons:github" />
              <span>Show profile on Github</span>
            </a>
          </Button>
        </div>
        <Card class="w-full">
          <CardContent class="mt-6">
            <div class="grid w-full gap-2 text-xs">
              <div
                v-if="user.location"
                class="flex items-center gap-2 text-muted-foreground"
              >
                <MapPin class="size-4" />
                <span>{{ user.location }}</span>
              </div>
              <div
                v-if="user.company"
                class="flex items-center gap-2 text-muted-foreground"
              >
                <Building2 class="size-4" />
                <span>{{ user.company }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <img
          :alt="`${user.login}'s activity graph`"
          :src="buildActivityGraphLink(user.login)"
          class="rounded-lg"
        />
        <div class="flex flex-col gap-2 md:flex-row">
          <img
            :alt="`${user.login}'s Github Dashboard`"
            :src="buildUserDashboardStatsGraphLink(user.databaseId)"
            class="h-auto w-full rounded-lg border border-primary"
          />
          <img
            :alt="`${user.login}'s Recent Work - Last 28 days`"
            :src="buildCurrentlyWorkingOnGraphLink(user.databaseId)"
            class="h-auto w-full rounded-lg border border-primary"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
