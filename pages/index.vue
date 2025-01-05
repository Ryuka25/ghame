<script lang="ts" setup>
import { Loader2, Rocket } from "lucide-vue-next";
import { APP_DESCRIPTION, APP_GITHUB_LINK } from "~/lib/app";
import { vFocus } from "~/lib/utils";

import { useToast } from "@/components/ui/toast/use-toast";

definePageMeta({
  middleware: "redirect-if-logged-in",
});

function polishUsername(username: string) {
  return username.trim();
}

const router = useRouter();
const { toast } = useToast();

const storedUsername = useCookie("username");
const username = useState("username", () => "");
const isLoading = ref(false);

const onSubmit = async () => {
  isLoading.value = true;

  try {
    // validate username
    const polishedUsername = polishUsername(username.value);
    if (!polishedUsername) {
      toast({
        title: "Username is required",
        description: "Please enter your github username",
      });
      return;
    }

    // send request to the server
    const res = await $fetch("/api/login/", {
      method: "POST",
      body: {
        username: polishUsername(polishedUsername),
      },
    });

    // save the user to the store
    storedUsername.value = res.login;
    username.value = "";

    // navigate to the next page or dashboard
    if (router.currentRoute.value.query.next) {
      navigateTo({ path: router.currentRoute.value.query.next as string });
    } else {
      navigateTo({ path: "/app/" });
    }
  } catch (error) {
    console.log(error);
    toast({
      title: "Something went wrong ☃️",
      description:
        error.data?.message ||
        "The error is not obvious. Please try again later",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section
    class="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-4 sm:px-6 lg:flex-row lg:px-8"
  >
    <form class="text-center lg:block lg:text-left" @submit.prevent="onSubmit">
      <h1 class="text-5xl font-bold lg:text-7xl">
        Beat the
        <span class="mr-2 font-app text-6xl underline lg:text-8xl">Ghame</span>
      </h1>
      <div class="max-w-md">
        <p class="my-8">{{ APP_DESCRIPTION }}</p>
        <Input
          v-model="username"
          v-focus
          placeholder="Type your github username here..."
          required
          type="text"
          @change="username = polishUsername($event.target.value)"
        />
        <div
          class="mt-4 flex flex-col justify-center gap-2 lg:flex-row lg:justify-start"
        >
          <Button v-if="isLoading" class="w-full text-right lg:w-min" disabled>
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            Preparing the board
          </Button>
          <Button v-else class="w-full text-right lg:w-min">
            <Rocket class="mr-1 h-4 w-4" />
            Raise the challenge
          </Button>
          <Button
            v-if="APP_GITHUB_LINK"
            as-child
            class="w-full text-right lg:w-min"
            variant="outline"
          >
            <NuxtLink :to="APP_GITHUB_LINK" target="_blank">
              <Icon class="mr-1 h-4 w-4" name="simple-icons:github" />
              Star on github
            </NuxtLink>
          </Button>
        </div>
      </div>
    </form>
    <div class="flex w-full justify-center">
      <img
        alt="Ghame illustration"
        class="max-w-xl"
        src="~/assets/images/main-illustration.svg"
      />
    </div>
  </section>
</template>
