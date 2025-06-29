// src/lib/authActions.ts
"use server";

import { signIn } from "@/auth/auth";

export async function signInWithCredentials(email: string, password: string) {
  console.log("signInWithCredentials in");
  console.log("signInWithCredentials input out:", { email, password });
  try {
    console.log("signInWithCredentials input in:", { email, password });
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
