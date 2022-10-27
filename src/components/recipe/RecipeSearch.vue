<template>
  <SearchBar @filter-recipes="updateFilteredRecipes" />
  <h6 v-if="error">Er is iets mis gegaan :(</h6>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <div v-if="noSearchResult" class="ml-5 mb-5 mt-5">
      Helaas! Er zijn geen zoekresultaten.
    </div>
    <div v-if="recipes">
      <RecipeGrid :recipes="filteredRecipes || recipes" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SearchBar from "@/components/recipe/SearchBar.vue";
import type { Recipe } from "@/models/Recipe";
import { ref } from "vue";
import RecipeGrid from "./RecipeGrid.vue";
import filterRecipes from "@/util/filter";
import { computed } from "@vue/reactivity";

const props = defineProps<{
  recipes?: Recipe[];
  isLoading: boolean;
  error: string | null;
}>();

let filteredRecipes = ref<null | Recipe[]>(null);

function updateFilteredRecipes(filter: string) {
  if (filter === "") {
    filteredRecipes.value = null;
  } else if (props.recipes) {
    filteredRecipes.value = filterRecipes(filter, props.recipes);
  }
}

const noSearchResult = computed(() => {
  return filteredRecipes.value && filteredRecipes.value.length === 0;
});
</script>
