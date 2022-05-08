<template>
  <div class="home">
    <div class="recipe-card-container">
      <div v-for="(recipe, i) in recipeStore.recipes" :key="i">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import { useRecipeStore } from "@/stores/recipe";

const recipeStore = useRecipeStore();
recipeStore.fetchRecipes();
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
