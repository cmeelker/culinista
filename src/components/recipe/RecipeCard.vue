<template>
  <div
    class="hover:shadow-lg cursor-pointer h-full border-b flex rounded-lg overflow-hidden"
  >
    <div class="h-36 overflow-hidden flex flex-col justify-center">
      <img :src="recipe.image" />
    </div>
    <div class="max-h-6 flex mt-2.5 mx-2.5 mb-1">
      <q-badge
        v-for="tag in tags"
        :key="tag"
        rounded
        :label="tag"
        class="h-6"
      />
    </div>
    <div class="flex items-center justify-between my-1.5 mx-2.5 w-full">
      <div class="font-bold basis-4/6">{{ recipe.title }}</div>
      <div class="basis-1/6 ml-2">
        <img
          v-if="recipe.favicon === undefined"
          src="@/assets/fork-knive-icon.png"
          class="h-[32px] w-[32px]"
        />
        <img v-else :src="recipe.favicon" class="h-[32px] w-[32px]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "@/models/Recipe";
import { computed } from "@vue/reactivity";

const props = defineProps<{
  recipe: Recipe;
}>();

const tags = computed(() => {
  return props.recipe.tags
    ? props.recipe.tags.length > 2
      ? props.recipe.tags.slice(0, 2)
      : props.recipe.tags
    : null;
});
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";

.q-badge {
  color: black;
  background-color: $light;
  padding: 5px 20px 5px 20px;
  margin-right: 10px;
}
</style>
