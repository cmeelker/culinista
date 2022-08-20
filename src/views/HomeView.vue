<template>
  <RecipeSearch
    :recipes="filteredRecipes"
    :no-search-result="noSearchResult"
    :loading="loading"
    :error="error"
  />
</template>

<script setup lang="ts">
import { useRecipeStore } from "@/stores/recipe";
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";
import RecipeSearch from "../components/recipe/RecipeSearch.vue";

const { filteredRecipes, recipes, loading, error } = storeToRefs(
  useRecipeStore()
);

const recipeStore = useRecipeStore();
recipeStore.fetchRecipes();

const noSearchResult = computed(() => {
  return filteredRecipes.value.length == 0 && recipes.value.length > 0;
});
</script>
