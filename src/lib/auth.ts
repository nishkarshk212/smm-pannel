import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      balance: number;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: prisma ? PrismaAdapter(prisma) : undefined as any,
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        // If prisma is not available, throw error
        if (!prisma) {
          console.error("Database not configured");
          throw new Error("Database connection error. Please try again later.");
        }

        try {
          // Find or create user by email (passwordless authentication)
          let user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split("@")[0],
              },
            });
          }

          return user;
        } catch (error: any) {
          console.error("Auth error:", error);
          throw new Error(error.message || "Failed to authenticate user");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: any) {
      if (session.user && prisma) {
        session.user.id = token.sub;
        // Fetch balance from DB
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        session.user.balance = user?.balance || 0;
      }
      return session;
    },
  },
};
