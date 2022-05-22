<template>
  <h6 v-if="error">{{ error }}</h6>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <RecipeDetails v-if="recipe" :recipe="recipe" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/stores/recipe";
import RecipeDetails from "@/components/recipe/RecipeDetails.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const { recipe, loading, error } = storeToRefs(useRecipeStore());

const route = useRoute();
const id = +route.params.id;

const recipeStore = useRecipeStore();
recipeStore.fetchRecipe(id);
</script>
