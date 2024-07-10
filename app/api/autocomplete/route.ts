import { type NextRequest, NextResponse } from "next/server";

const url = "https://places.googleapis.com/v1/places:autocomplete";

export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY as string;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing Google API Key" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify({
        input,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Recieved status: ${response.status} from Google`,
        },
        { status: 500 },
      );
    }

    const data = await response.json();

    return NextResponse.json({ data: data.suggestions });
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    return NextResponse.json(
      { error: "Error fetching autocomplete suggestions" },
      { status: 500 },
    );
  }
}
