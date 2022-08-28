<template>
  <div
    :class="{
      'border border-4 border-primary': isSelected,
      'hover:opacity-50': !isSelected,
    }"
    class="rounded overflow-hidden hover:cursor-pointer h-48"
    @click="$emit('selectImage')"
  >
    <img :src="image" class="object-cover object-center w-full h-full" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  isSelected: boolean;
}>();

defineEmits(["selectImage"]);
</script>
