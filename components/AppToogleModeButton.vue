<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";

const colorMode = useColorMode();

const toogleColorMode = () => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};
</script>
<template>
  <Button variant="ghost" size="icon" @click="toogleColorMode">
    <Moon
      class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Sun
      class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
