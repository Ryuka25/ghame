<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const top1 = "border-2 border-yellow-500 bg-yellow-300 text-yellow-700";
const top2 = "border-2 border-gray-500 bg-gray-300 text-gray-700";
const top3 = "border-2 border-yellow-800 bg-yellow-600 text-yellow-950";

const props = defineProps<{
  number: number;
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        'text-centers flex aspect-square size-6 items-center justify-center rounded-full text-xs font-semibold text-primary',
        props.number === 1 ? top1 : '',
        props.number === 2 ? top2 : '',
        props.number === 3 ? top3 : '',
        props.class,
      )
    "
  >
    {{ props.number }}
  </div>
</template>

<style scoped></style>
