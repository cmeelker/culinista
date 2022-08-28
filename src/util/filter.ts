import type { Recipe } from "@/models/Recipe";

export default function filterRecipes(
  filter: string,
  recipes: Recipe[]
): Recipe[] {
  return recipes.filter((recipe) => {
    const includesTitle = recipe.title.toLowerCase().includes(filter);
    const includesTags = recipe.tags
      ? recipe.tags.toString().toLowerCase().includes(filter)
      : false;

    return includesTitle || includesTags;
  });
}
