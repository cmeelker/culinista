import { defineStore } from "pinia";
import axios from "@/services/ApiClient";

import type { Recipe } from "@/models/Recipe";

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
        const data = await axios.get("/Recipe");
        this.recipes = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
