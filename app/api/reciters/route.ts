import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.mp3quran.net/api/v3/reciters?language=ar",
      {
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch reciters" },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to connect to recitation service" },
      { status: 503 }
    );
  }
}
