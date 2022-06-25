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
    const includesIngredients = recipe.ingredients
      .map((ingredient) => {
        return ingredient.name;
      })
      .toString()
      .toLowerCase()
      .includes(filter);

    return includesTitle || includesTags || includesIngredients;
  });
}
