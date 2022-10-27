import { defineStore } from "pinia";
import axios from "@/services/ApiClient";

import type { Tag } from "@/models/Tag";

import type { RecipePreview } from "@/models/RecipePreview";
import type { NewRecipe, Recipe } from "@/models/Recipe";

interface State {
  filteredRecipes: Recipe[];
}

export const useRecipeStore = defineStore({
  id: "recipe",
  state: (): State => ({
    filteredRecipes: [],
  }),
  actions: {
    async fetchRecipePreview(url: string): Promise<RecipePreview | null> {
      let recipePreview: RecipePreview | null = null;

      try {
        const { data } = await axios.get(`/Crawler?url=${url}`);
        recipePreview = data;
      } catch (error) {
        console.log(error);
      }

      return recipePreview;
    },

    async editTags(id: number, tags: Tag[]): Promise<void> {
      const tagString = tags?.length > 0 ? tags.toString() : null;

      try {
        await axios.patch(`/Recipe/${id}`, { tags: tagString });
      } catch (error) {
        console.log(error);
      }
      //await this.fetchRecipe(id, false);
    },

    async addRecipe(recipe: NewRecipe): Promise<number | null> {
      let id: number | null = null;

      try {
        const { data } = await axios.post(`/Recipe`, recipe);
        id = data;
      } catch (error) {
        console.log(error);
      }
      return id;
    },

    async deleteRecipe(id: number) {
      try {
        await axios.delete(`/Recipe/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
