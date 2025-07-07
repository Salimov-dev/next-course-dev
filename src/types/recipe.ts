import { Key } from "react";
import { IIngredient } from "./ingredient";

export interface IRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: {
    id: Key | null | undefined;
    ingredient: IIngredient;
    ingredientId: string;
    quantity: number;
  }[];
}
