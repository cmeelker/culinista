<template>
  <div class="recipe">
    <div class="header">
      <RecipeHeader :recipe="recipe" />
    </div>
    <div class="content">
      <div class="ingredients">
        <RecipeIngredients
          :ingredients="recipe.ingredients"
          :servings="recipe.servings"
        />
      </div>
      <div class="instructions">
        <RecipeInstructions :instructions="recipe.instructions" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Recipe } from "../../models/Recipe";

import RecipeIngredients from "./RecipeIngredients.vue";
import RecipeInstructions from "./RecipeInstructions.vue";
import RecipeHeader from "./RecipeHeader.vue";

defineProps<{
  recipe: Recipe;
}>();
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
.recipe {
  padding: 50px;
  display: flex;
  flex-direction: column;
}

.header {
  height: 250px;
  display: flex;
  margin-bottom: 40px;
}

.content {
  display: flex;
}

.ingredients {
  flex: 1;
}

.instructions {
  flex: 2;
}
</style>
