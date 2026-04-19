import { getBalance, getServices } from "@/lib/airsmm";
import { NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Test endpoint to verify AirSMM API connection
export async function GET() {
  try {
    // Test 1: Check balance
    console.log("Testing AirSMM balance check...");
    const balance = await getBalance();
    
    // Test 2: Get services
    console.log("Testing AirSMM services fetch...");
    const services = await getServices();

    return NextResponse.json({
      success: true,
      message: "AirSMM API connection successful!",
      balance: balance,
      servicesCount: services.length,
      sampleServices: services.slice(0, 5), // Show first 5 services
    });
  } catch (error: any) {
    console.error("AirSMM API test failed:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "AirSMM API connection failed. Check your API key and URL.",
    }, { status: 500 });
  }
}
