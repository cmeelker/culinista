import { createMapper } from "@jeroenhuinink/tsmapper";

export type RecipePreview = {
  title: string;
  images: string[];
};

export const recipeMapper = createMapper("RecipeMapper")
  .field("title", {
    type: "string",
  })
  .field("images", {
    type: "array",
    itemType: {
      type: "enum",
      map: (image) => {
        return image;
      },
    },
  });
