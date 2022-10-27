import {
  mapToInternalRecipe,
  recipeMapper,
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
