import type { Recipe } from "@/models/Recipe";
import axios from "@/services/ApiClient";

export async function fetchFavorites(userId: string): Promise<Recipe[]> {
  const { data } = await axios.get(`/Favorite?userId=${userId}`);
  return data;
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
