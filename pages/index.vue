<script lang="ts" setup>
import { Rocket, Loader2 } from "lucide-vue-next";
import { APP_DESCRIPTION, APP_GITHUB_LINK } from "~/lib/app";

import { useToast } from "@/components/ui/toast/use-toast";

function polishUsername(username: string) {
  return username.trim();
}

const router = useRouter();
const { toast } = useToast();

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
    localStorage.setItem("username", res.login);
    username.value = "";

    // navigate to the next page or dashboard
    if (router.currentRoute.value.query.next) {
      navigateTo({ path: router.currentRoute.value.query.next as string });
    } else {
      navigateTo({ path: "/app" });
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

onMounted(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    navigateTo({
      path: "/app/",
      replace: true,
    });
  }
});
</script>

<template>
  <section
    class="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-4 sm:px-6 lg:flex-row lg:px-8"
  >
    <form class="text-center lg:block lg:text-left" @submit.prevent="onSubmit">
      <h1 class="text-5xl font-bold lg:text-7xl">
        Beat the
        <span class="mr-2 font-app text-6xl underline lg:text-8xl"> Ghame</span>
      </h1>
      <div class="max-w-md">
        <p class="my-8">{{ APP_DESCRIPTION }}</p>
        <Input
          v-model="username"
          type="text"
          placeholder="Type your github username here..."
          required
          @change="username = polishUsername($event.target.value)"
        />
        <div class="flex justify-center lg:justify-start">
          <Button v-if="isLoading" class="my-4 text-right" disabled>
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            Preparing the board
          </Button>
          <Button v-else class="my-4 text-right">
            <Rocket class="mr-1 h-4 w-4" />
            Raise the challenge
          </Button>
          <Button
            v-if="APP_GITHUB_LINK"
            class="my-4 ml-2 text-right"
            variant="outline"
            as-child
          >
            <NuxtLink :to="APP_GITHUB_LINK" target="_blank">
              <Icon name="simple-icons:github" class="mr-1 h-4 w-4" />
              Star on github
            </NuxtLink>
          </Button>
        </div>
      </div>
    </form>
    <div class="flex w-full justify-center">
      <img src="~/assets/images/main-illustration.svg" class="max-w-xl" />
    </div>
  </section>
</template>
