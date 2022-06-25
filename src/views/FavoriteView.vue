<template>
  <RecipeList
    :recipes="filteredRecipes"
    :no-search-result="noSearchResult"
    :loading="loading"
    :error="error"
  />
</template>

<script lang="ts" setup>
import RecipeList from "@/components/recipe/RecipeList.vue";
import { useFavoriteStore } from "@/stores/favorite";
import { useAuth0 } from "@auth0/auth0-vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { user } = useAuth0();

const { filteredRecipes, recipes, loading, error } = storeToRefs(
  useFavoriteStore()
);

const favoriteStore = useFavoriteStore();

favoriteStore.fetchFavorites(user.value.sub ?? "0");

const noSearchResult = computed(() => {
  return filteredRecipes.value.length == 0 && recipes.value.length > 0;
});
</script>
