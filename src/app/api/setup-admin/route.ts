import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// One-time setup: Set specific user as admin
// DELETE THIS FILE after use
export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const adminEmail = "nishkarshk46@gmail.com";
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: adminEmail },
    });
    
    if (!user) {
      return NextResponse.json({ 
        error: `User ${adminEmail} not found. Please sign up first with this email.`,
      }, { status: 404 });
    }

    // Update user to admin
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" },
    });

    return NextResponse.json({
      success: true,
      message: `User ${updatedUser.email} has been set as ADMIN`,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      instruction: "Now sign in and access /admin/payments. DELETE this file after use!"
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ 
      error: "Failed to update user role",
      details: error.message 
    }, { status: 500 });
  }
}
