import { NextRequest, NextResponse } from "next/server";
import { handleForwardRequest, postIdphotoUrl } from "@/lib/api";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  if (!body.signedUrl || !body.imageBase64) {
    return NextResponse.json(
      { error: "signedUrl and imageBase64 are required" },
      { status: 400 },
    );
  }

  try {
    return await handleForwardRequest(
      postIdphotoUrl(body.signedUrl, {
        imageBase64: body.imageBase64,
      }),
    );
  } catch (error) {
    console.error("Error creating watermark photo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
