<template>
  <div class="bg-[#F6F6F6] rounded w-full py-6 flex">
    <div class="absolute -ml-5 -mt-1">
      <NumberCircle :number="number" :filled="isDone" />
    </div>
    <div class="w-full mx-10">
      <div class="text-lg sm:text-2xl font-bold">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import NumberCircle from "./NumberCircle.vue";
defineProps<{
  title: string;
  number: number;
  isDone: boolean;
}>();
</script>
