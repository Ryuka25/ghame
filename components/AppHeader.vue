<script lang="ts" setup>
import { ContactRound, Menu } from "lucide-vue-next";
import { APP_GITHUB_LINK } from "~/lib/app";

const navigation = [
  {
    label: "Contact us",
    icon: ContactRound,
    to: "/contact",
  },
];

onMounted(() => {
  if (storedUsername.value && !user.value) {
    $fetch("/api/whoami", {
      query: {
        username: storedUsername.value,
      },
    }).then((userData) => {
      user.value = userData;
    });
  }
});

const storedUsername = useCookie("username");
const user = useUser();
const menuIsOpen = useState(() => false);

const closeMenu = () => {
  menuIsOpen.value = false;
};
</script>

<template>
  <header class="sticky top-0 z-50 -mb-px bg-background/75 backdrop-blur">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8"
    >
      <!-- Mobile navigation -->
      <div class="flex-1 lg:hidden">
        <Sheet
          :open="menuIsOpen"
          @update:open="(value) => (menuIsOpen = value)"
        >
          <SheetTrigger as-child>
            <Button size="icon" variant="outline">
              <Menu :class="['size-4 transition-all']" />
              <span class="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <NuxtLink class="flex-1" to="/" @click="closeMenu">
              <AppName />
            </NuxtLink>
            <nav class="w-full bg-background">
              <ul class="flex flex-col justify-center gap-4 p-4">
                <li v-for="link in navigation" :key="link.to">
                  <NuxtLink
                    :to="link.to"
                    active-class="!text-foreground"
                    class="flex items-center gap-2 text-foreground/80 hover:text-foreground"
                    @click="closeMenu"
                  >
                    <component :is="link.icon" class="size-5" />
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <!-- /Mobile navigation -->

      <!--      App logo -->
      <NuxtLink to="/">
        <AppName />
      </NuxtLink>
      <!--      /App logo -->

      <!-- Desktop Navigation -->
      <nav class="hidden lg:block">
        <ul class="flex gap-4">
          <li v-for="link in navigation" :key="link.to">
            <NuxtLink
              :to="link.to"
              active-class="!text-foreground"
              class="text-foreground/60 opacity-80 transition-colors hover:text-foreground/80"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- /Desktop Navigation -->
      <div class="flex flex-1 items-center justify-end gap-1">
        <AppToogleModeButton />
        <AppGithubButton v-if="APP_GITHUB_LINK" :link="APP_GITHUB_LINK" />
        <UserNav v-if="user" :user />
      </div>
    </div>
  </header>
</template>
