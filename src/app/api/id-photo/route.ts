import { NextRequest, NextResponse } from "next/server";
import { forwardRequest, handleForwardRequest, readEnv } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACTIONS = {
  makeWatermark: "/v2/makeIdPhotoWatermark",
  getNoWatermark: "/v2/getIdPhotoNoWatermark",
} as const;

type Action = keyof typeof ACTIONS;

function isAction(value: unknown): value is Action {
  return value === "makeWatermark" || value === "getNoWatermark";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isAction(body.action)) {
    return NextResponse.json(
      { error: "action must be makeWatermark or getNoWatermark" },
      { status: 400 },
    );
  }

  if (body.action === "makeWatermark") {
    if (!body.specCode || !body.imageBase64) {
      return NextResponse.json(
        { error: "specCode and imageBase64 are required" },
        { status: 400 },
      );
    }
  } else if (!body.photoUuid) {
    return NextResponse.json(
      { error: "photoUuid is required" },
      { status: 400 },
    );
  }

  const apiKey = readEnv("IDPHOTO_API_KEY");
  const apiSecret = readEnv("IDPHOTO_API_SECRET");
  if (!apiKey || !apiSecret) {
    console.error("[id-photo] IDPHOTO_API_KEY is empty at request time.");
    return NextResponse.json(
      { error: "ID photo service is not configured" },
      { status: 500 },
    );
  }

  const payload =
    body.action === "makeWatermark"
      ? {
          specCode: body.specCode,
          imageBase64: body.imageBase64,
        }
      : {
          photoUuid: body.photoUuid,
        };

  return handleForwardRequest(
    forwardRequest("POST", ACTIONS[body.action], payload),
  );
}
