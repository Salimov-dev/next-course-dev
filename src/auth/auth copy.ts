import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "@/utils/user";
import { signInSchema } from "@/schema/zod";
import { ZodError } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          // Проверяем наличие credentials
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email и пароль обязательны");
          }

          // Валидируем credentials с помощью Zod
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Получаем пользователя из базы данных
          const user = await getUserFromDb(email);

          // Проверяем, существует ли пользователь
          if (!user || !user.password) {
            throw new Error("Неверный ввод данных");
          }

          // Проверяем, совпадает ли пароль
          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Неверный ввод данных");
          }

          // Возвращаем объект пользователя без пароля
          return {
            id: user.id,
            email: user.email
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          console.error("Ошибка авторизации:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt" // Попробуйте изменить на "jwt" вместо "database"
  },
  secret: process.env.NEXTAUTH_SECRET, // Добавьте этот параметр
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && typeof token.id === "string") {
        session.user.id = token.id; // здесь TS теперь знает, что это string
      }
      return session;
    }
  }
});
