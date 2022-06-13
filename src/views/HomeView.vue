<template>
  <div class="content">
    <div class="search">
      <SearchAndFilter />
    </div>
    <div class="recipes">
      <h6 v-if="error">Er is iets mis gegaan :(</h6>
      <div v-if="loading">
        <LoadingSpinner />
      </div>
      <div v-else>
        <div class="home">
          <div class="recipe-card-container">
            <div v-if="noSearchResult" class="no-filtered-recipes">
              Helaas! Er zijn geen zoekresultaten.
            </div>
            <div v-for="(recipe, i) in filteredRecipes" :key="i">
              <RecipeCard @click="openRecipe(recipe.id)" :recipe="recipe" />
            </div>
          </div>
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
import SearchAndFilter from "@/components/main/SearchAndFilter.vue";
import { computed } from "@vue/reactivity";

const { filteredRecipes, recipes, loading, error } = storeToRefs(
  useRecipeStore()
);

const noSearchResult = computed(() => {
  return filteredRecipes.value.length == 0 && recipes.value.length > 0;
});

const recipeStore = useRecipeStore();
recipeStore.fetchRecipes();

function openRecipe(id: number) {
  router.push(`/recipe/${id}`);
}
</script>

<style scoped lang="scss">
.content {
  width: 100%;
}
.home {
  display: flex;
}

.search {
  margin-left: 10px;
  margin-right: 10px;
  background-color: white;
}

.recipe-card-container {
  flex: 4;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  gap: 5px;
  margin: 10px;
}

.no-filtered-recipes {
  margin-left: 10px;
}
</style>
