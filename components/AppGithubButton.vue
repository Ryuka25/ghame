<script lang="ts" setup>
const props = defineProps<{
  link: string;
}>();
</script>

<template>
  <Button variant="ghost" size="icon" as-child>
    <NuxtLink :to="props.link" target="_blank">
      <Icon name="simple-icons:github" class="h-4 w-4" />
      <span class="sr-only">Show on GitHub</span>
    </NuxtLink>
  </Button>
</template>
