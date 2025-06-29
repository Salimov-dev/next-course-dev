"use server";

import { signIn } from "@/auth/auth";

export async function signInWithCredentials(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    console.log("result", result);

    return result;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw error;
  }
}
