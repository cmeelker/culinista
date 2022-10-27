import { createMapper } from "@jeroenhuinink/tsmapper";
import { Tag } from "./Tag";

export type Recipe = NewRecipe & { id: number };

export type NewRecipe = {
  title: string;
  tags: Tag[];
  url: string;
  image: string;
  userId: string;
  favicon?: string;
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
  .field("url", {
    type: "string",
  })
  .field("image", {
    type: "string",
  })
  .field("userId", {
    type: "string",
  })
  .field("favicon", {
    type: "string",
    optional: true,
  });

export function mapToInternalRecipe(recipe: ExternalRecipe): Recipe {
  return {
    id: recipe.id,
    title: recipe.title,
    tags: recipe.tags as Tag[],
    url: recipe.url,
    image: recipe.image,
    favicon: recipe.favicon,
    userId: recipe.userId,
  };
}
