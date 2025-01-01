<script lang="ts" setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { Rocket } from "lucide-vue-next";
import { APP_DESCRIPTION, APP_GITHUB_LINK } from "~/lib/app";

const { toast } = useToast();

const onClick = () => {
  toast({
    title: "🎉 Shipeo it!",
    description:
      "Please contact us to get started and blend this fabulous template with your super idea.",
  });
};
</script>

<template>
  <section
    class="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-4 sm:px-6 lg:flex-row lg:px-8"
  >
    <div class="text-center lg:block lg:text-left">
      <h1 class="text-5xl font-bold lg:text-7xl">
        <span class="mr-2 font-app text-6xl underline lg:text-8xl">
          Shipeo</span
        >
        your code in minutes, not a month
      </h1>
      <p class="my-8">{{ APP_DESCRIPTION }}</p>
      <div class="flex justify-center lg:justify-start">
        <Button class="my-4 text-right" as-child @click="onClick">
          <NuxtLink to="/contact">
            <Rocket class="mr-1 h-4 w-4" />
            Get started
          </NuxtLink>
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
    <div class="flex w-full justify-center">
      <img
        src="~/assets/images/main-illustration.svg"
        class="max-w-xl animate-wiggle"
      />
    </div>
  </section>
</template>
