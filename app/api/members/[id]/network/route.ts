import { NextRequest, NextResponse } from "next/server";
import { getMemberNetwork } from "@/lib/services/network";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const searchParams = request.nextUrl.searchParams;
    const degreeParam = searchParams.get("degree");

    const degree = degreeParam ? Number(degreeParam) : 3;

    if (![1, 2, 3].includes(degree)) {
      return NextResponse.json(
        {
          error: "Degree must be 1, 2, or 3",
        },
        {
          status: 400,
        }
      );
    }

    const network = await getMemberNetwork(id, degree);

    return NextResponse.json(network);
  } catch (error) {
    console.error("Network API error:", error);

    return NextResponse.json(
      {
        error: "Failed to retrieve member network",
      },
      {
        status: 500,
      }
    );
  }
}