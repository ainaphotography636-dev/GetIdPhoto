import { NextRequest, NextResponse } from "next/server";
import convert from "heic-convert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 20 * 1024 * 1024;

export async function POST(req: NextRequest): Promise<NextResponse> {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Upload a HEIC photo." }, { status: 400 });
  }

  const file = form.get("photo");
  if (!(file instanceof Blob) || file.size === 0) {
    return NextResponse.json({ error: "Upload a HEIC photo." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "This photo is too large. Choose one under 20 MB." },
      { status: 413 },
    );
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const jpeg = await convert({
      buffer: input,
      format: "JPEG",
      quality: 0.92,
    });
    const body = Buffer.from(jpeg);
    if (body.length < 32) {
      return NextResponse.json(
        { error: "Could not convert this HEIC photo." },
        { status: 422 },
      );
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[HEIC] conversion failed", error);
    return NextResponse.json(
      { error: "Could not convert this HEIC photo." },
      { status: 422 },
    );
  }
}
