import { createMapper } from "@jeroenhuinink/tsmapper";
import { Tag } from "./Tag";

export type Recipe = {
  id?: number;
  title: string;
  tags?: Tag[];
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
    url: recipe.url,
    image: recipe.image,
  };
}
