import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic os_v2_app_a6b3gawlljduvhzipgdjylaoaoeu3a6lilcejvnj3sokpnyodsoglp4wxqjzkxhtutuo5y5hdeq4igtky73nvs3um4pfsnqiik54eui",
      },
      body: JSON.stringify({
        app_id: "0783b302-cb5a-474a-9f28-79869c2c0e03",
        included_segments: ["All"],
        headings: { en: "RemyNest" },
        contents: { en: "🔥 Your notification system is working." },
      }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}