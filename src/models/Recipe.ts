import { createMapper } from "@jeroenhuinink/tsmapper";
import { Label } from "./Label";
import { Source } from "@/models/Source";

//export type Recipe = ReturnType<typeof recipeMapper.map>;
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
};

export type IngredientUnit = ReturnType<typeof ingredientsMapper.map>;

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
    map: (val: unknown) => (val as string).split(";"),
  })
  .field("source", { type: "enum", enum: Object.values(Source) });
