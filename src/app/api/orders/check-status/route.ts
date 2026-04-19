import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkOrderStatus } from "@/lib/airsmm";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// This endpoint checks AirSMM order status and updates database
// Can be called manually or via cron job
export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    // Get all PROCESSING orders
    const processingOrders = await prisma.order.findMany({
      where: {
        status: "PROCESSING",
      },
    });

    const results = [];

    // Check status for each order
    for (const order of processingOrders) {
      try {
        // You would need to store the AirSMM order ID in the database
        // For now, we'll skip this part until you add that field
        // const airsmmStatus = await checkOrderStatus(order.airsmmOrderId);
        
        // Map AirSMM status to your status
        // AirSMM statuses: Pending, Partial, In progress, Completed, Cancelled, Error
        // Your statuses: PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED
        
        // Example logic (uncomment when you have airsmmOrderId field):
        /*
        if (airsmmStatus.status === "Completed") {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "COMPLETED" },
          });
          results.push({ orderId: order.id, status: "COMPLETED" });
        } else if (airsmmStatus.status === "Error" || airsmmStatus.status === "Cancelled") {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "FAILED" },
          });
          results.push({ orderId: order.id, status: "FAILED" });
        }
        */
        
        results.push({ orderId: order.id, status: "Skipped (need airsmmOrderId)" });
      } catch (error: any) {
        console.error(`Error checking order ${order.id}:`, error.message);
        results.push({ orderId: order.id, error: error.message });
      }
    }

    return NextResponse.json({
      success: true,
      checked: results.length,
      results,
    });
  } catch (error: any) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Failed to check order statuses", details: error.message },
      { status: 500 }
    );
  }
}
