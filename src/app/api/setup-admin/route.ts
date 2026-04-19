import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// This is a one-time setup script to set the first user as admin
// DELETE THIS FILE after use for security
export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    // Get the first user
    const user = await prisma.user.findFirst();
    
    if (!user) {
      return NextResponse.json({ 
        error: "No users found. Please sign up first.",
        users: [] 
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
      instruction: "Now you can access /admin/payments. DELETE this file after use!"
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ 
      error: "Failed to update user role",
      details: error.message 
    }, { status: 500 });
  }
}
