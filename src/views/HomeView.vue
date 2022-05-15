<template>
  <div class="home">
    <div class="recipe-card-container">
      <div v-for="(recipe, i) in recipeStore.recipes" :key="i">
        <RecipeCard @click="openRecipe(recipe.id)" :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/recipe/RecipeCard.vue";
import { useRecipeStore } from "@/stores/recipe";
import router from "@/router/index";

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
