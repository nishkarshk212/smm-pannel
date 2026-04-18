import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering to prevent build-time database access
export const dynamic = 'force-dynamic';

// This would typically be an admin-only endpoint
export async function POST(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin (you can add a role field to User model)
  // For now, we'll allow anyone with an account to add for testing
  
  const { phoneNumber, sessionString } = await req.json();

  if (!sessionString) {
    return NextResponse.json({ error: "Session string is required" }, { status: 400 });
  }

  try {
    const account = await (prisma as any).telegramAccount.create({
      data: {
        phoneNumber,
        session: sessionString,
      },
    });

    return NextResponse.json(account);
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: "Account already exists" }, { status: 400 });
    }
    console.error("Account error:", err);
    return NextResponse.json({ error: "Failed to add account" }, { status: 500 });
  }
}

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const accounts = await (prisma as any).telegramAccount.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(accounts);
}
