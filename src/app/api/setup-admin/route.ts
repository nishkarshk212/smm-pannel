import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// One-time setup: Create admin account
// DELETE THIS FILE after use
export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const adminEmail = "nishkarshk46@gmail.com";
    const adminPassword = "Nishkarsh242";
    
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: adminEmail },
    });
    
    if (!user) {
      // Create new user with password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      user = await prisma.user.create({
        data: {
          email: adminEmail,
          name: adminEmail.split("@")[0],
          password: hashedPassword,
          role: "ADMIN",
        },
      });
      
      return NextResponse.json({
        success: true,
        message: `Admin account created for ${adminEmail}`,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        instruction: "Account created! Now sign in with your credentials at /api/auth/signin"
      });
    } else {
      // Update existing user to admin
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
    }
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ 
      error: "Failed to setup admin",
      details: error.message 
    }, { status: 500 });
  }
}
