import { NextResponse } from "next/server";
import { testCognoDBConnection } from "@/lib/db/test-connection";

export async function GET() {
  try {
    const message = await testCognoDBConnection();

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("CognoDB connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to CognoDB",
      },
      { status: 500 }
    );
  }
}