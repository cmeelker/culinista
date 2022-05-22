import { defineStore } from "pinia";
import axios from "@/services/ApiClient";

import {
  mapToInternalRecipe,
  recipeMapper,
  type Recipe,
} from "@/models/Recipe";
import type { Source } from "@jeroenhuinink/tsmapper";

interface State {
  recipe: Recipe | null;
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export const useRecipeStore = defineStore({
  id: "recipe",
  state: (): State => ({
    recipe: null,
    recipes: [],
    loading: true,
    error: null,
  }),
  actions: {
    async fetchRecipes() {
      this.loading = true;
      try {
        const { data } = await axios.get("/Recipe");
        const recipes = data.map(function (recipe: Source) {
          return recipeMapper.map(recipe);
        });
        this.recipes = recipes;
      } catch (error) {
        this.error = error as string;
      }
      this.loading = false;
    },
    async fetchRecipe(id: number) {
      this.loading = true;
      try {
        const { data } = await axios.get(`/Recipe/${id}`);
        const recipe = recipeMapper.map(data);
        this.recipe = mapToInternalRecipe(recipe);
      } catch (error) {
        this.error = error as string;
      }
      this.loading = false;
    },
    async addRecipe(url: string): Promise<number | null> {
      this.loading = true;
      let id: number | null = null;
      try {
        const { data } = await axios.post("/Crawler", url);
        id = data;
      } catch (error) {
        this.error = error as string;
      }
      this.loading = false;
      return id;
    },
  },
});
