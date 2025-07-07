"use client";

import { IRecipe } from "@/types/recipe";
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { useRecipeStore } from "@/store/recipe.store";
import Link from "next/link";
import { useTransition } from "react";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { removeRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id);
      } catch (error) {
        console.error("Ошибка при удалении рецепта:", error);
      }
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{recipe.name}</h2>
        <div className="flex gap-2">
          <Link href={`/recipes/${recipe.id}`}>
            <Button color="primary" variant="light">
              Редактировать
            </Button>
          </Link>
          <Button
            color="danger"
            variant="light"
            onPress={handleDelete}
            isLoading={isPending}
          >
            Удалить
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-gray-600">{recipe.description || "Без описания"}</p>
        <h3 className="mt-4 font-semibold">Ингредиенты:</h3>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.ingredient.name}: {ing.quantity} {ing.ingredient.unit}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
