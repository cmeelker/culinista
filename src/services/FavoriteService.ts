import { recipeMapper, type Recipe } from "@/models/Recipe";
import axios from "@/services/ApiClient";
import type { Source } from "@jeroenhuinink/tsmapper";

export async function fetchFavorites(
  userId: string,
  token: string
): Promise<Recipe[]> {
  const { data } = await axios.get(`/Favorite?userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const recipes: Recipe[] = data.map(function (recipe: Source) {
    return recipeMapper.map(recipe);
  });
  return recipes;
}

export async function postFavorite({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: number;
}) {
  await axios.post(`/Favorite?userId=${userId}&recipeId=${recipeId}`);
}
