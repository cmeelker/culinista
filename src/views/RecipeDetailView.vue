<template>
  <h6 v-if="error">Oeps, er is iets mis gegaan!</h6>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <RecipeDetails v-if="recipe" :recipe="recipe" />

    <h2 class="sm:text-4xl text-2xl mt-16 mb-4">Vergelijkbare recepten</h2>
    <hr class="border-b-[1px] border-b-dark w-full" />

    <RecipeList :recipes="recipes" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/stores/recipe";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import RecipeDetails from "@/components/recipe/RecipeDetails.vue";
import RecipeList from "@/components/recipe/RecipeList.vue";
import { onBeforeRouteUpdate } from "vue-router";

const { recipe, recipes, loading, error } = storeToRefs(useRecipeStore());

const route = useRoute();
const id = +route.params.id;

const recipeStore = useRecipeStore();
recipeStore.fetchRecipe(id);

onBeforeRouteUpdate(async (to, _) => {
  const recipeStore = useRecipeStore();
  await recipeStore.fetchRecipe(+to.params.id);
});
</script>
