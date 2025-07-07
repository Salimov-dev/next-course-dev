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
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.find((r) => r.id === id);
      setRecipe(foundRecipe || null);
      setHasSearched(true);
    }
  }, [recipes, id, error]);

  if (isLoading) return <p className="text-center">Загрузка...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Показываем "не найден" только после завершения поиска
  if (hasSearched && !recipe) {
    return <p className="text-red-500 text-center">Рецепт не найден</p>;
  }

  // Показываем форму только когда рецепт найден
  if (recipe) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Редактировать рецепт: {recipe.name}
        </h1>
        <RecipeForm initialRecipe={recipe} />
      </div>
    );
  }

  // Пока данные загружаются и рецепт еще не найден, но и ошибки нет
  return <p className="text-center">Загрузка...</p>;
}
