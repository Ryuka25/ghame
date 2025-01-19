<script lang="ts" setup>
import { Building2, Ellipsis, MapPin } from "lucide-vue-next";

const route = useRoute();

const username = route.params.username as string;

const {
  data: user,
  error,
  status,
} = await useFetch(`/api/players/${username}`, {
  lazy: true,
});
</script>

<template>
  <section class="mx-auto h-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div class="flex justify-center">
      <div
        v-if="status === 'success' && user"
        class="flex w-full flex-col items-center gap-4"
      >
        <Avatar class="size-32">
          <AvatarImage :alt="user.login" :src="user.avatarUrl" />
          <AvatarFallback>{{ user.initial }}</AvatarFallback>
        </Avatar>
        <div class="grid gap-1 text-center">
          <p v-if="user.name" class="text-md font-medium leading-none">
            {{ user.name }}
          </p>
          <p class="text-sm text-muted-foreground">{{ user.login }}</p>
        </div>
        <div class="flex gap-4">
          <div class="flex flex-1 flex-col justify-between gap-1 text-center">
            <div class="text-sm font-medium leading-none">108</div>
            <div class="text-[0.5rem]">Followers</div>
          </div>
          <Separator orientation="vertical" />
          <div class="flex flex-1 flex-col justify-between gap-1 text-center">
            <div class="text-sm font-medium leading-none">108</div>
            <div class="text-[0.5rem]">Public contributions</div>
          </div>
          <Separator orientation="vertical" />
          <div class="flex flex-1 flex-col justify-between gap-1 text-center">
            <div class="text-sm font-medium leading-none">108</div>
            <div class="text-[0.5rem]">Total contributions</div>
          </div>
        </div>
        <div class="flex w-full gap-2">
          <Button class="flex-1">Challenge</Button>
          <Button size="icon" variant="secondary">
            <Ellipsis class="size-4" />
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
      </div>
    </div>
  </section>
</template>

<style scoped></style>
