// app/page.tsx
"use client";

import SignOutButton from "@/auth/SignOutButton";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  console.log("session", session);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Пользователь авторизован:", session.user);
      // Можно перенаправить на защищенную страницу
      // router.push("/dashboard");
    }
  }, [status, session]);

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <h1>
          Добро пожаловать, {session.user?.email}! <SignOutButton />
        </h1>
        {/* Кнопка выхода и т.д. */}
      </div>
    );
  }

  return (
    <div>
      <h1>Вы не авторизованы</h1>
      {/* Форма входа */}
    </div>
  );
}
