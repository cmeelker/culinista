<template>
  <div class="mt-5 grid gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    <div v-for="(recipe, i) in recipes" :key="i">
      <RecipeCard @click="openRecipe(recipe.id)" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/recipe/RecipeCard.vue";
import router from "@/router/index";
import type { Recipe } from "@/models/Recipe";

defineProps<{
  recipes: Recipe[];
}>();

function openRecipe(id?: number) {
  router.push(`/recipe/${id}`).then(() => {
    window.location.reload();
  });
}
</script>
