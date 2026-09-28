import { NextRequest, NextResponse } from "next/server";
import {
  forwardRequest,
  handleForwardRequest,
  getIdphotoCredentials,
} from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACTIONS = {
  makeIdPhoto: "/v2/makeIdPhoto",
  makeWatermark: "/v2/makeIdPhotoWatermark",
  getNoWatermark: "/v2/getIdPhotoNoWatermark",
} as const;

type Action = keyof typeof ACTIONS;

function isAction(value: unknown): value is Action {
  return (
    value === "makeIdPhoto" ||
    value === "makeWatermark" ||
    value === "getNoWatermark"
  );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch (error) {
      console.error("IDPhoto API Error:", error);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Default to direct makeIdPhoto when action is omitted.
    const action: Action = isAction(body.action) ? body.action : "makeIdPhoto";

    if (action === "makeIdPhoto" || action === "makeWatermark") {
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

    const { apiKey, apiSecret } = getIdphotoCredentials();
    if (!apiKey || !apiSecret) {
      console.error(
        "IDPhoto API Error: missing credentials at request time.",
        {
          hasKey: Boolean(apiKey),
          hasSecret: Boolean(apiSecret),
          lookedFor: [
            "IDPHOTO_AI_API_KEY",
            "IDPHOTO_AI_API_SECRET",
            "IDPHOTO_API_KEY",
            "IDPHOTO_API_SECRET",
          ],
        },
      );
      return NextResponse.json(
        {
          error:
            "ID photo service is not configured. Set IDPHOTO_AI_API_KEY and IDPHOTO_AI_API_SECRET on the server.",
        },
        { status: 500 },
      );
    }

    // Explicit credentials in the JSON body (also re-applied by forwardRequest).
    const payload =
      action === "getNoWatermark"
        ? {
            apiKey,
            apiSecret,
            photoUuid: body.photoUuid,
          }
        : {
            apiKey,
            apiSecret,
            specCode: body.specCode,
            imageBase64: body.imageBase64,
            ...(action === "makeWatermark"
              ? { watermarkText: body.watermarkText || "Preview" }
              : {}),
          };

    return await handleForwardRequest(
      forwardRequest("POST", ACTIONS[action], payload),
    );
  } catch (error) {
    console.error("IDPhoto API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `IDPhoto API Error: ${error.message}`
            : "IDPhoto API Error: unexpected failure",
      },
      { status: 500 },
    );
  }
}
