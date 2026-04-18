import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { subject, message, priority } = await req.json();

  if (!subject || !message) {
    return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
  }

  try {
    const ticket = await (prisma as any).ticket.create({
      data: {
        userId: (session.user as any).id,
        subject,
        message,
        priority: priority || "MEDIUM",
      },
    });

    return NextResponse.json(ticket);
  } catch (err) {
    console.error("Ticket error:", err);
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tickets = await (prisma as any).ticket.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tickets);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}
