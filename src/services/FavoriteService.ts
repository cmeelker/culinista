import { recipeMapper, type Recipe } from "@/models/Recipe";
import axios from "@/services/ApiClient";
import { useAuth0 } from "@auth0/auth0-vue";
import type { Source } from "@jeroenhuinink/tsmapper";

export async function fetchFavorites(userId: string): Promise<Recipe[]> {
  // TODO: Dit op een centrale plek
  const { getAccessTokenSilently } = useAuth0();
  const accessToken = await getAccessTokenSilently();

  const { data } = await axios.get(`/Favorite?userId=${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
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
