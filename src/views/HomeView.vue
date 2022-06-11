<template>
  <h6 v-if="error">Er is iets mis gegaan :(</h6>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <div class="home">
      <div class="recipe-card-container">
        <div v-for="(recipe, i) in recipes" :key="i">
          <RecipeCard @click="openRecipe(recipe.id)" :recipe="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/recipe/RecipeCard.vue";
import { useRecipeStore } from "@/stores/recipe";
import router from "@/router/index";
import { storeToRefs } from "pinia";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const { recipes, loading, error } = storeToRefs(useRecipeStore());

const recipeStore = useRecipeStore();
recipeStore.fetchRecipes();

function openRecipe(id: number) {
  router.push(`/recipe/${id}`);
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
}

.filter-area {
  margin: 20px;
  flex: 1;
}
.recipe-card-container {
  flex: 4;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  gap: 5px;
  margin: 10px;
}
</style>
