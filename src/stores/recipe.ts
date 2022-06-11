import { defineStore } from "pinia";
import axios from "@/services/ApiClient";

import {
  mapToInternalRecipe,
  recipeMapper,
  type Recipe,
} from "@/models/Recipe";
import type { Source } from "@jeroenhuinink/tsmapper";
import type { Tag } from "@/models/Tag";

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
      this.error = null;
      try {
        const { data } = await axios.get("/Recipe");
        const recipes = data.map(function (recipe: Source) {
          return recipeMapper.map(recipe);
        });
        this.recipes = recipes;
      } catch (error) {
        this.error = error as string;
        console.log(error);
      }
      this.loading = false;
    },
    async fetchRecipe(id: number, firstLoad = true) {
      if (firstLoad) {
        this.loading = true;
      }
      this.error = null;
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
        this.error = "Het lijkt er op dat je geen geldige URL hebt ingevuld";
      }
      this.loading = false;
      return id;
    },
    async editTags(id: number, tags: Tag[]): Promise<void> {
      const tagString = tags?.length > 0 ? tags.toString() : null;

      try {
        await axios.patch(`/Recipe/${id}`, { tags: tagString });
      } catch (error) {
        this.error = "Het aanpassen van tags is niet gelukt";
      }
      await this.fetchRecipe(id, false);
    },
    async deleteRecipe(id: number) {
      this.loading = true;
      try {
        await axios.delete(`/Recipe/${id}`);
      } catch (error) {
        this.error = "Het verwijderen is niet gelukt";
      }
      this.loading = false;
    },
  },
});
