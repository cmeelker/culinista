<template>
  <RecipeSearch
    :recipes="data"
    :is-loading="isLoading"
    :error="(error as string)"
  />
</template>

<script setup lang="ts">
import RecipeSearch from "../components/recipe/RecipeSearch.vue";
import { useQuery } from "vue-query";
import { fetchRecipes } from "@/services/RecipeService";

const { isLoading, data, error } = useQuery("recipes", fetchRecipes);
</script>
