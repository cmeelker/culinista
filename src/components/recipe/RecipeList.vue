<template>
  <div class="ml-5 mr-5">
    <SearchAndFilter />
  </div>
  <h6 v-if="error">Er is iets mis gegaan :(</h6>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <div class="m-5 grid gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div v-if="noSearchResult" class="ml-5 mb-5">
        Helaas! Er zijn geen zoekresultaten.
      </div>
      <div v-for="(recipe, i) in recipes" :key="i">
        <RecipeCard @click="openRecipe(recipe.id)" :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/recipe/RecipeCard.vue";
import router from "@/router/index";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SearchAndFilter from "@/components/main/SearchAndFilter.vue";
import type { Recipe } from "@/models/Recipe";

defineProps<{
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  noSearchResult: boolean;
}>();

function openRecipe(id: number) {
  router.push(`/recipe/${id}`);
}
</script>
