import { NextRequest, NextResponse } from "next/server";
import { forwardRequest } from "@/lib/api";
import { getStripeInstance } from "@/lib/stripe";
import { buildPostcardSheet, buildSinglePhoto } from "@/lib/printPack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function unlockPhoto(photoUuid: string): Promise<string> {
  const photoRes = await forwardRequest("POST", "/v2/getIdPhotoNoWatermark", {
    photoUuid,
  });
  if (!photoRes.ok) {
    const text = await photoRes.text();
    throw new Error(text || "Could not retrieve the paid photo");
  }
  const data = await photoRes.json();
  const url = data.idPhotoUrl || data.idPhotoTempResultPhotoUrl;
  if (!url || typeof url !== "string") {
    throw new Error("The paid photo did not include a download URL");
  }
  return url;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const kind = req.nextUrl.searchParams.get("kind");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }
  if (kind !== "single" && kind !== "sheet") {
    return NextResponse.json(
      { error: "kind must be single or sheet" },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripeInstance();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment is not complete" }, { status: 402 });
    }

    const photoUuid = session.metadata?.photoUuid;
    if (!photoUuid) {
      return NextResponse.json(
        { error: "This payment has no photo attached" },
        { status: 404 },
      );
    }

    const sourceUrl = await unlockPhoto(photoUuid);
    const sourceRes = await fetch(sourceUrl);
    if (!sourceRes.ok) {
      return NextResponse.json(
        { error: "Could not download the paid photo" },
        { status: 502 },
      );
    }
    const source = Buffer.from(await sourceRes.arrayBuffer());
    const specCode = session.metadata?.specCode;
    const file =
      kind === "single"
        ? await buildSinglePhoto(source, specCode)
        : await buildPostcardSheet(source, specCode);
    const filename =
      kind === "single"
        ? "getidphoto-single-600dpi.jpg"
        : "getidphoto-postcard-4up-600dpi.jpg";

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("[print-pack]", error);
    const message = error instanceof Error ? error.message : "Could not build the print file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
