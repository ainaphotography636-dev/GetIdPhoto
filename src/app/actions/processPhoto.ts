"use server";

import { forwardRequest, getIdphotoCredentials } from "@/lib/api";

const REQUEST_TIMEOUT_MS = 60_000;

export interface ProcessPhotoInput {
  /** Raw base64 or a data URL. */
  imageBase64: string;
  specCode?: string;
}

export interface ProcessPhotoSuccess {
  ok: true;
  orderId: string;
  idPhotoImage: string;
  issues: string[];
  waterMark: boolean;
}

export interface ProcessPhotoFailure {
  ok: false;
  error: string;
}

export type ProcessPhotoResult = ProcessPhotoSuccess | ProcessPhotoFailure;

interface IdPhotoResponse {
  photoUuid?: string;
  idPhotoUrl?: string;
  issues?: string[];
  waterMark?: boolean;
  error?: string;
  message?: string;
}

function toRawBase64(imageBase64: string): string {
  const value = imageBase64.trim();
  const comma = value.indexOf(",");
  if (value.startsWith("data:") && comma !== -1) {
    return value.slice(comma + 1);
  }
  return value;
}

function describeIdPhotoError(
  status: number,
  body: IdPhotoResponse,
  raw: string,
): string {
  const message = (body.error || body.message || raw || "").trim();
  const combined = message.toLowerCase();

  if (
    status === 402 ||
    combined.includes("credit") ||
    combined.includes("quota") ||
    combined.includes("insufficient")
  ) {
    return "IdPhoto.AI has no credits left for this request. Add credits in the IdPhoto.AI dashboard and try again.";
  }
  if (
    status === 401 ||
    status === 403 ||
    combined.includes("apikey") ||
    combined.includes("api key")
  ) {
    return "IdPhoto.AI rejected the API credentials. Check IDPHOTO_AI_API_KEY and IDPHOTO_AI_API_SECRET on the server.";
  }
  if (
    combined.includes("face") ||
    combined.includes("image") ||
    combined.includes("base64") ||
    combined.includes("format")
  ) {
    return (
      message ||
      "IdPhoto.AI could not use this image. Upload a clear front-facing photo and try again."
    );
  }
  return message || `IdPhoto.AI request failed (HTTP ${status}).`;
}

export async function processPhoto(
  input: ProcessPhotoInput,
): Promise<ProcessPhotoResult> {
  const { apiKey, apiSecret } = getIdphotoCredentials();
  if (!apiKey || !apiSecret) {
    console.error("IDPhoto API Error: missing credentials", {
      hasKey: Boolean(apiKey),
      hasSecret: Boolean(apiSecret),
    });
    return {
      ok: false,
      error:
        "Photo service is not configured. Set IDPHOTO_AI_API_KEY and IDPHOTO_AI_API_SECRET on the server.",
    };
  }

  const image = toRawBase64(input.imageBase64 || "");
  if (image.length < 32) {
    return { ok: false, error: "Upload a photo before creating an ID picture." };
  }

  const specCode = (input.specCode || "").trim();
  if (!specCode) {
    return {
      ok: false,
      error: "Choose a photo type before creating an ID picture.",
    };
  }

  try {
    // Watermarked preview so paid unlock via getIdPhotoNoWatermark still works.
    const response = await Promise.race([
      forwardRequest("POST", "/v2/makeIdPhotoWatermark", {
        apiKey,
        apiSecret,
        specCode,
        imageBase64: image,
        watermarkText: "Preview",
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(Object.assign(new Error("timeout"), { name: "AbortError" }));
        }, REQUEST_TIMEOUT_MS);
      }),
    ]);

    const raw = await response.text();
    let body: IdPhotoResponse = {};
    try {
      body = raw ? (JSON.parse(raw) as IdPhotoResponse) : {};
    } catch (error) {
      console.error("IDPhoto API Error:", {
        status: response.status,
        parseError: error,
        responseText: raw.slice(0, 2000),
      });
      return {
        ok: false,
        error: `IdPhoto.AI returned a non-JSON response (HTTP ${response.status}).`,
      };
    }

    if (!response.ok || !body.photoUuid || !body.idPhotoUrl) {
      console.error("IDPhoto API Error:", {
        status: response.status,
        body,
        responseText: raw.slice(0, 2000),
      });
      return {
        ok: false,
        error: describeIdPhotoError(response.status, body, raw),
      };
    }

    return {
      ok: true,
      orderId: body.photoUuid,
      idPhotoImage: body.idPhotoUrl,
      issues: Array.isArray(body.issues) ? body.issues : [],
      waterMark: body.waterMark !== false,
    };
  } catch (error) {
    console.error("IDPhoto API Error:", error);
    if (error instanceof Error && error.name === "AbortError") {
      return {
        ok: false,
        error:
          "IdPhoto.AI took too long to respond. Wait a moment and try the photo again.",
      };
    }
    const message = error instanceof Error ? error.message : "Network error";
    return {
      ok: false,
      error: `Could not reach IdPhoto.AI. ${message}`,
    };
  }
}
