"use server";

import { ingredientSchema } from "@/schema/zod";
import prisma from "@/utils/prisma";
import { ZodError } from "zod";

export async function createIngredient(formData: FormData) {
  try {
    console.log("formData", formData);

    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      unit: formData.get("unit") as string,
      pricePerUnit: formData.get("pricePerUnit")
        ? parseFloat(formData.get("pricePerUnit") as string)
        : null,
      description: formData.get("description") as string
    };

    const validatedData = ingredientSchema.parse(data);

    const ingredient = await prisma.ingredient.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        unit: validatedData.unit,
        pricePerUnit: validatedData.pricePerUnit,
        description: validatedData.description
      }
    });

    return { success: true, ingredient };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.errors.map((e) => e.message).join(", ") };
    }

    console.error("Ошибка создания ингредиента:", error);
    return { error: "Ошибка при создании ингредиента" };
  }
}
