<template>
  <h6 v-if="error">Oeps, er is iets mis gegaan!</h6>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <RecipeDetails v-if="data" :recipe="data" />

    <h2 class="sm:text-4xl text-2xl mt-16 mb-4">Vergelijkbare recepten</h2>
    <hr class="border-b-[1px] border-b-dark w-full" />

    <RecipeGrid :recipes="recipes || []" />
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import RecipeDetails from "@/components/recipe/RecipeDetails.vue";
import RecipeGrid from "@/components/recipe/RecipeGrid.vue";
import { fetchRecipe, fetchRecipes } from "@/services/RecipeService";
import { useQuery, useQueryClient } from "vue-query";
import { watch } from "vue";

const queryClient = useQueryClient();

const props = defineProps<{
  recipeId: number;
}>();

watch(
  () => props.recipeId,
  () => {
    queryClient.invalidateQueries("recipe");
  }
);

const { isLoading, data, error } = useQuery(["recipe", props.recipeId], () =>
  fetchRecipe(props.recipeId)
);

const recipesQuery = useQuery("recipes", fetchRecipes);
const recipes = recipesQuery.data;
</script>
