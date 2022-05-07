<template>
  <div class="home">
    <div class="recipe-card-container">
      <div v-for="(recipe, i) in recipes" :key="i">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import type { Recipe } from "@/models/Recipe";

// recipes uit store halen

const recipe: Recipe = {
  id: 1,
  title: "Ravioli met crème van kikkererwten met een hele lange titel",
  labels: ["Snel", "Gezond"],
  ingredients: "Kikkererwten",
  image: "image",
  logo: "logo",
};

const recipes = [recipe, recipe, recipe, recipe];
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
