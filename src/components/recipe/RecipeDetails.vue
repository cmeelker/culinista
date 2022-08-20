<template>
  <RecipeHeader :recipe="recipe" />

  <h2 class="sm:text-4xl text-2xl mt-16 mb-4">Vergelijkbare recepten</h2>
  <hr class="border-b-[1px] border-b-dark w-full" />

  <RecipeList :recipes="recipes" />
</template>

<script lang="ts" setup>
import { useRecipeStore } from "@/stores/recipe";
import { storeToRefs } from "pinia";
import type { Recipe } from "../../models/Recipe";
import RecipeHeader from "./RecipeHeader.vue";
import RecipeList from "./RecipeList.vue";

defineProps<{
  recipe: Recipe;
}>();

const { recipes } = storeToRefs(useRecipeStore());

// TO DO: Implement similar recipes API
</script>
