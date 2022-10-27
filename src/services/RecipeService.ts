import {
  mapToInternalRecipe,
  recipeMapper,
  type NewRecipe,
  type Recipe,
} from "@/models/Recipe";
import axios from "@/services/ApiClient";
import type { Source } from "@jeroenhuinink/tsmapper";

export async function fetchRecipes() {
  const { data } = await axios.get("/Recipe");
  const recipes: Recipe[] = data.map(function (recipe: Source) {
    return recipeMapper.map(recipe);
  });
  return recipes;
}

export async function fetchRecipe(id: number) {
  const { data } = await axios.get(`/Recipe/${id}`);
  const recipe = recipeMapper.map(data);
  return mapToInternalRecipe(recipe);
}

export async function fetchRecipePreview(url: string) {
  const { data } = await axios.get(`/Crawler?url=${url}`);
  return data;
}

export async function postRecipe(recipe: NewRecipe) {
  const { data } = await axios.post(`/Recipe`, recipe);
  return data;
}
