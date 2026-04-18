import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!prisma || !credentials?.email) return null;

        // For simplicity in this demo, we'll just find or create a user
        // In a real app, you'd check passwords
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
