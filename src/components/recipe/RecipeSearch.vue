<template>
  <SearchBar />

  <h6 v-if="error">Er is iets mis gegaan :(</h6>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <div v-if="noSearchResult" class="ml-5 mb-5 mt-5">
      Helaas! Er zijn geen zoekresultaten.
    </div>
    <RecipeGrid :recipes="recipes" />
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SearchBar from "@/components/recipe/SearchBar.vue";
import type { Recipe } from "@/models/Recipe";
import RecipeGrid from "./RecipeGrid.vue";

defineProps<{
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  noSearchResult: boolean;
}>();
</script>
