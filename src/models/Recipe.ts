import { createMapper } from "@jeroenhuinink/tsmapper";
import { Tag } from "./Tag";
import { Source } from "@/models/Source";

export type Recipe = {
  id: number;
  title: string;
  tags: Tag[];
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

function tagMapper(tags: any): Tag[] | void {
  if (tags != null) {
    const tagList = tags.split(",");
    tagList.map((tag: any) => {
      if (tag in Tag) {
        return Tag[tag] as unknown as Tag;
      }
    });

    return tagList;
  }
}

export type IngredientUnit = ReturnType<typeof ingredientsMapper.map>;
export type ExternalRecipe = ReturnType<typeof recipeMapper.map>;

const ingredientsMapper = createMapper("IngredientsMapper")
  .field("name", { type: "string" })
  .field("unit", { type: "string" });

export const recipeMapper = createMapper("RecipeMapper")
  .field("id", { type: "number" })
  .field("title", { type: "string" })
  .field("tags", { map: tagMapper, optional: true })
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
    tags: recipe.tags as Tag[],
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions.split(";"),
    source: recipe.source,
    url: recipe.url,
    image: recipe.image,
  };
}
