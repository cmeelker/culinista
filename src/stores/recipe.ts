import { defineStore } from "pinia";
import axios from "@/services/ApiClient";

import { recipeMapper, type Recipe } from "@/models/Recipe";
import type { Source } from "@jeroenhuinink/tsmapper";

interface State {
  recipes: Recipe[];
}

export const useRecipeStore = defineStore({
  id: "recipe",
  state: (): State => ({
    recipes: [],
  }),
  actions: {
    async fetchRecipes() {
      try {
        const { data } = await axios.get("/Recipe");
        const recipes = data.map(function (recipe: Source) {
          return recipeMapper.map(recipe);
        });
        this.recipes = recipes;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
