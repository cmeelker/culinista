import type { Recipe } from "@/models/Recipe";

export default function filterRecipes(
  filter: string,
  recipes: Recipe[]
): Recipe[] {
  return recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(filter) ||
      recipe.tags.toString().toLowerCase().includes(filter) ||
      recipe.ingredients
        .map((ingredient) => {
          return ingredient.name;
        })
        .toString()
        .toLowerCase()
        .includes(filter)
    );
  });
}
