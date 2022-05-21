import { createMapper } from "@jeroenhuinink/tsmapper";
import { Label } from "./Label";
import { Source } from "@/models/Source";

export type Recipe = {
  id: number;
  title: string;
  labels: Label | undefined;
  servings: number;
  ingredients: ({
    name: string;
  } & {
    unit: string;
  })[];
  instructions: string[];
  source: string | Source.AH;
  url: string;
  image: string;
};

export type IngredientUnit = ReturnType<typeof ingredientsMapper.map>;
export type ExternalRecipe = ReturnType<typeof recipeMapper.map>;

const ingredientsMapper = createMapper("IngredientsMapper")
  .field("name", { type: "string" })
  .field("unit", { type: "string" });

export const recipeMapper = createMapper("RecipeMapper")
  .field("id", { type: "number" })
  .field("title", { type: "string" })
  .field("labels", {
    type: "enum",
    optional: true,
    default: Label.Fast,
    enum: Object.values(Label),
  })
  .field("servings", {
    type: "number",
  })
  .field("ingredients", {
    default: [],
    itemType: { mapper: ingredientsMapper },
  })
  .field("instructions", {
    type: "string",
  })
  .field("source", { type: "enum", enum: Object.values(Source) })
  .field("url", {
    type: "string",
  })
  .field("image", {
    type: "string",
  });

export function mapToInternalRecipe(recipe: ExternalRecipe): Recipe {
  return {
    id: recipe.id,
    title: recipe.title,
    labels: recipe.labels,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions.split(";"),
    source: recipe.source,
    url: recipe.url,
    image: recipe.image,
  };
}
