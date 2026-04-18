import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only create PrismaClient if DATABASE_URL is available (not during build)
export const prisma = globalForPrisma.prisma ?? (
  process.env.DATABASE_URL 
    ? new PrismaClient() 
    : null as any
);

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
