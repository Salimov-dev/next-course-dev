import { IIngredient } from "./ingredient";

export interface IRecipe {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  ingredients: {
    id: string;
    ingredientId: string;
    quantity: number;
    ingredient: IIngredient;
  }[];
}

export interface ActionResult {
  success: boolean;
  recipe?: IRecipe;
  error?: string;
}
