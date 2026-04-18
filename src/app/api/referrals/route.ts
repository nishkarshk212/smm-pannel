import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Force dynamic rendering to prevent build-time database access
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await (prisma as any).user.findUnique({
      where: { id: (session.user as any).id },
      include: {
        referrals: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      referralCode: user.referralCode,
      referralEarnings: user.referralEarnings,
      referrals: user.referrals.map((r: any) => ({
        id: r.id,
        email: r.email,
        createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch referral data" }, { status: 500 });
  }
}
