import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subscriptionId } = await req.json();

    console.log("Saving subscription:", subscriptionId);

    return NextResponse.json({
      success: true,
      subscriptionId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save subscription" },
      { status: 500 }
    );
  }
}