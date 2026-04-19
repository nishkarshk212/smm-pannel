import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, DefaultSession } from "next-auth";
import bcrypt from "bcryptjs";

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
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // If prisma is not available, throw error
        if (!prisma) {
          console.error("Database not configured");
          throw new Error("Database connection error. Please try again later.");
        }

        try {
          const action = credentials.action;

          // SIGN UP: Create new user with password
          if (action === "signup") {
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (existingUser) {
              throw new Error("User already exists. Please sign in.");
            }

            // Validate password (alphanumeric only)
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
            if (!passwordRegex.test(credentials.password)) {
              throw new Error("Password must be alphanumeric (letters and numbers only)");
            }

            if (credentials.password.length < 6) {
              throw new Error("Password must be at least 6 characters long");
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(credentials.password, 12);

            // Create new user
            const user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split("@")[0],
                password: hashedPassword,
              },
            });

            return user;
          }

          // SIGN IN: Authenticate existing user
          if (action === "signin") {
            const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });

            if (!user || !user.password) {
              throw new Error("Invalid email or password");
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordValid) {
              throw new Error("Invalid email or password");
            }

            return user;
          }

          throw new Error("Invalid action");
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
