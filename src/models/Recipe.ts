import { createMapper } from "@jeroenhuinink/tsmapper";
import { Label, labelMapper } from "./Label";

export type Recipe = {
  id: number;
  title: string;
  labels: string[];
  ingredients: string;
  image: string;
  logo: string;
};

export const recipeMapper = createMapper("RecipeMapper")
  .field("id", { type: "number" })
  .field("title", { type: "string" })
  .field("labels", {
    type: "array",
    optional: true,
    default: [Label.Fast, Label.Healthy],
    itemType: { type: "enum", map: labelMapper },
  })
  .field("ingredients", {
    type: "string",
  })
  .field("image", { type: "string", optional: true, default: "image" })
  .field("logo", { type: "string", optional: true, default: "logo" });
