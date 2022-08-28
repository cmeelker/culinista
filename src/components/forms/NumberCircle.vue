<template>
  <div
    :class="{
      'bg-white border border-2 border-primary text-brand': !filled,
      'bg-brand text-white': filled,
    }"
    class="h-10 w-10 rounded-full font-bold text-xl flex justify-center items-center"
  >
    <div>
      {{ number }}
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  number: number;
  filled: boolean;
}>();
</script>
