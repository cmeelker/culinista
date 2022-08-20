<template>
  <SearchAndFilter />

  <h6 v-if="error">Er is iets mis gegaan :(</h6>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <div v-if="noSearchResult" class="ml-5 mb-5 mt-5">
      Helaas! Er zijn geen zoekresultaten.
    </div>
    <RecipeList :recipes="recipes" />
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SearchAndFilter from "@/components/main/SearchAndFilter.vue";
import type { Recipe } from "@/models/Recipe";
import RecipeList from "./RecipeList.vue";

defineProps<{
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  noSearchResult: boolean;
}>();
</script>
