"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RecipeForm from "@/forms/recipe.form";
import { useRecipeStore } from "@/store/recipe.store";
import { IRecipe } from "@/types/recipe";

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error } = useRecipeStore();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, [recipes, id]);
  if (isLoading) return <p className="text-center">Загрузка...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!recipe)
    return <p className="text-red-500 text-center">Рецепт не найден</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font Lavender Cyrillic Regular-bold mb-4">
        Редактировать рецепт: {recipe.name}
      </h1>
      <RecipeForm initialRecipe={recipe} />
    </div>
  );
}
