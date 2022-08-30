import { defineStore } from "pinia";
import axios from "@/services/ApiClient";

import {
  mapToInternalRecipe,
  recipeMapper,
  type Recipe,
} from "@/models/Recipe";
import type { Source } from "@jeroenhuinink/tsmapper";
import type { Tag } from "@/models/Tag";
import filterRecipes from "@/util/filter";
import type { RecipePreview } from "@/models/RecipePreview";

interface State {
  recipe: Recipe | null;
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export const useRecipeStore = defineStore({
  id: "recipe",
  state: (): State => ({
    recipe: null,
    recipes: [],
    filteredRecipes: [],
    loading: true,
    error: null,
  }),
  actions: {
    filterRecipes(filter: string): void {
      this.filteredRecipes = filterRecipes(filter.toLowerCase(), this.recipes);
    },

    async fetchRecipes() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get("/Recipe");
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

    async fetchRecipePreview(url: string): Promise<RecipePreview | null> {
      this.loading = true;

      let recipePreview: RecipePreview | null = null;

      try {
        const { data } = await axios.get(`/Crawler?url=${url}`);
        recipePreview = data;
      } catch (error) {
        this.error = "Het lijkt er op dat je geen geldige URL hebt ingevuld";
      }

      this.loading = false;
      return recipePreview;
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

    async addRecipe(recipe: Recipe): Promise<number | null> {
      this.loading = true;
      let id: number | null = null;

      try {
        const { data } = await axios.post(`/Recipe`, recipe);
        id = data;
      } catch (error) {
        this.error =
          "Sorry! Er is iets mis gegaan met het toevoegen van dit recept";
      }

      this.loading = false;
      return id;
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
