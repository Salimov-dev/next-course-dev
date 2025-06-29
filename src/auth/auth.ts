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
          console.log("Attempting to authorize:", credentials);
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email и пароль обязательны");
          }
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          const user = await getUserFromDb(email);
          if (!user || !user.password) {
            console.log("User not found or no password:", email);
            throw new Error("Неверный ввод данных");
          }
          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          );
          console.log("Password valid:", isPasswordValid);
          if (!isPasswordValid) {
            throw new Error("Неверный ввод данных");
          }
          return { id: user.id, email: user.email };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt", // Попробуйте изменить на "jwt" вместо "database"
    maxAge: 3600, // 1 час
    updateAge: 300 // Обновлять срок при активности каждые 5 ми
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
