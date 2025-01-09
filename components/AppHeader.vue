<script lang="ts" setup>
import {
  ContactRound,
  Globe,
  GlobeLock,
  Menu,
  UsersRound,
} from "lucide-vue-next";
import { APP_GITHUB_LINK } from "~/lib/app";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

const router = useRouter();

const navigation = [
  {
    label: "Followers",
    icon: UsersRound,
    to: "/followers",
  },
  {
    label: "Public contributions",
    icon: Globe,
    to: "/public-contributions",
  },
  {
    label: "Total contributions",
    icon: GlobeLock,
    to: "/total-contributions",
  },
  {
    label: "Contact us",
    icon: ContactRound,
    to: "/contact",
  },
];
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
            <div class="mt-4 flex items-center gap-4">
              <NuxtLink class="flex-1" to="/" @click="closeMenu">
                <AppName />
              </NuxtLink>
              <div class="my-2 flex gap-2">
                <AppToogleModeButton show-label />
                <AppGithubButton
                  v-if="APP_GITHUB_LINK"
                  :link="APP_GITHUB_LINK"
                  show-label
                />
              </div>
            </div>
            <Separator />

            <nav class="w-full">
              <ul class="flex flex-col justify-center gap-4 p-4">
                <li v-for="link in navigation" :key="link.to">
                  <NuxtLink
                    :to="link.to"
                    active-class="!text-foreground"
                    class="flex h-8 items-center gap-2 text-sm text-foreground/80 hover:text-foreground"
                    @click="closeMenu"
                  >
                    <component :is="link.icon" class="size-4" />
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
      <div class="flex flex-1 justify-center gap-2 lg:justify-start">
        <NuxtLink to="/">
          <AppName />
        </NuxtLink>
      </div>
      <!--      /App logo -->

      <!-- Desktop Navigation -->
      <NavigationMenu class="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem
            v-for="link in navigation"
            :key="link.to"
            class="w-full"
          >
            <NuxtLink :to="link.to" link.to>
              <NavigationMenuLink
                :class="[
                  navigationMenuTriggerStyle(),
                  'w-full gap-2',
                  router.currentRoute.value.path == link.to
                    ? 'text-primary'
                    : '',
                ]"
              >
                {{ link.label }}
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <!-- /Desktop Navigation -->
      <div class="flex flex-1 items-center justify-end gap-1">
        <AppToogleModeButton class="hidden lg:inline-flex" />
        <AppGithubButton
          v-if="APP_GITHUB_LINK"
          :link="APP_GITHUB_LINK"
          class="hidden lg:inline-flex"
        />
        <UserNav :user />
      </div>
    </div>
  </header>
</template>
