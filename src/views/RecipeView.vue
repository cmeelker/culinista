<template>
  <h6 v-if="error">{{ error }}</h6>
  <div v-if="recipe">
    <RecipeDetails :recipe="recipe" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/stores/recipe";
import RecipeDetails from "@/components/recipe/RecipeDetails.vue";

const { recipe, error } = storeToRefs(useRecipeStore());

const route = useRoute();
const id = +route.params.id;

const recipeStore = useRecipeStore();
recipeStore.fetchRecipe(id);
</script>
