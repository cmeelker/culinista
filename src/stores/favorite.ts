import { recipeMapper, type Recipe } from "@/models/Recipe";
import { defineStore } from "pinia";
import axios from "@/services/ApiClient";
import type { Source } from "@jeroenhuinink/tsmapper";
import filterRecipes from "@/util/filter";

interface State {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export const useFavoriteStore = defineStore({
  id: "favorite",
  state: (): State => ({
    recipes: [],
    filteredRecipes: [],
    loading: true,
    error: null,
  }),
  actions: {
    filterRecipes(filter: string): void {
      this.filteredRecipes = filterRecipes(filter.toLowerCase(), this.recipes);
    },
    async fetchFavorites(userId: string) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get(`/Favorite/${userId}`);
        const recipes = data.map(function (recipe: Source) {
          return recipeMapper.map(recipe);
        });
        this.recipes = recipes;
        this.filteredRecipes = recipes;
      } catch (error) {
        this.error = error as string;
        console.log(error);
      }
      this.loading = false;
    },

    async toggleFavorite(userId: string, recipeId: number) {
      try {
        await axios.post("/Favorite", {
          userId: userId,
          recipieId: recipeId,
        });
      } catch (error) {
        this.error = error as string;
        console.log(error);
      }
    },
  },
});
