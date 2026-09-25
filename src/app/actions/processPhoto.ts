"use server";

import { allPhotoSpecs, type SpecCode } from "@/models/PhotoSpec";

const CUTOUT_PASSPORT_URL = "https://www.cutout.pro/api/v1/idphoto/printLayout";
const REQUEST_TIMEOUT_MS = 60_000;
/** 4×6 inch postcard. Cutout lays out as many photos as fit, capped at 4. */
const POSTCARD_WIDTH_MM = 102;
const POSTCARD_HEIGHT_MM = 152;

export interface ProcessPhotoInput {
  /** Raw base64 or a data URL. The data-URL prefix is removed before sending. */
  imageBase64: string;
  specCode?: string;
  mmWidth?: number;
  mmHeight?: number;
  dpi?: number;
}

export interface ProcessPhotoSuccess {
  ok: true;
  orderId: string;
  idPhotoImage: string;
  printLayoutImage: string;
  idPhotoCount: number;
  mmWidth: number;
  mmHeight: number;
}

export interface ProcessPhotoFailure {
  ok: false;
  error: string;
  code?: number;
}

export type ProcessPhotoResult = ProcessPhotoSuccess | ProcessPhotoFailure;

interface CutoutResponse {
  code?: number;
  msg?: string | null;
  data?: {
    idPhotoImage?: string;
    printLayoutImage?: string;
    idPhotoCount?: number;
  };
}

function readApiKey(): string {
  const value = process.env["CUTOUT_PRO_API_KEY"];
  return typeof value === "string" ? value.replace(/\0/g, "").trim() : "";
}

function toRawBase64(imageBase64: string): string {
  const value = imageBase64.trim();
  const comma = value.indexOf(",");
  if (value.startsWith("data:") && comma !== -1) {
    return value.slice(comma + 1);
  }
  return value;
}

function sizeForSpec(specCode: string | undefined): {
  mmWidth: number;
  mmHeight: number;
  dpi: number;
} {
  const spec = specCode
    ? allPhotoSpecs[specCode as SpecCode]
    : undefined;
  if (!spec || spec.unit !== "mm") {
    return { mmWidth: 35, mmHeight: 45, dpi: 600 };
  }
  return {
    mmWidth: spec.widthUnit,
    mmHeight: spec.heightUnit,
    dpi: spec.dpi || 600,
  };
}

function describeCutoutError(status: number, body: CutoutResponse, raw: string): string {
  const message = (body.msg || raw || "").trim();
  const code = body.code;
  const combined = `${code ?? ""} ${message}`.toLowerCase();

  if (
    status === 402 ||
    combined.includes("credit") ||
    combined.includes("balance") ||
    combined.includes("quota") ||
    combined.includes("insufficient")
  ) {
    return "Cutout.pro has no credits left for this request. Add credits in the Cutout.pro dashboard and try again.";
  }
  if (status === 401 || status === 403 || combined.includes("apikey") || combined.includes("api key")) {
    return "Cutout.pro rejected the API key. Check CUTOUT_PRO_API_KEY on the server.";
  }
  if (
    combined.includes("face") ||
    combined.includes("image") ||
    combined.includes("base64") ||
    combined.includes("resolution") ||
    combined.includes("format")
  ) {
    return message || "Cutout.pro could not use this image. Upload a clear JPG, PNG, or WEBP under 15MB and 4096×4096.";
  }
  return message || `Cutout.pro request failed (HTTP ${status}).`;
}

export async function processPhoto(
  input: ProcessPhotoInput,
): Promise<ProcessPhotoResult> {
  const apiKey = readApiKey();
  if (!apiKey) {
    return {
      ok: false,
      error: "Photo service is not configured. Set CUTOUT_PRO_API_KEY on the server.",
    };
  }

  const image = toRawBase64(input.imageBase64 || "");
  if (image.length < 32) {
    return { ok: false, error: "Upload a photo before creating an ID picture." };
  }

  const specSize = sizeForSpec(input.specCode);
  const mmWidth = input.mmWidth && input.mmWidth > 0 ? input.mmWidth : specSize.mmWidth;
  const mmHeight = input.mmHeight && input.mmHeight > 0 ? input.mmHeight : specSize.mmHeight;
  const dpi = input.dpi && input.dpi > 0 ? input.dpi : specSize.dpi;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CUTOUT_PASSPORT_URL, {
      method: "POST",
      headers: {
        APIKEY: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base64: image,
        bgColor: "FFFFFF",
        dpi,
        mmWidth,
        mmHeight,
        printBgColor: "FFFFFF",
        printMmWidth: POSTCARD_WIDTH_MM,
        printMmHeight: POSTCARD_HEIGHT_MM,
        printMaxCount: 4,
      }),
      signal: controller.signal,
    });

    const raw = await response.text();
    let body: CutoutResponse = {};
    try {
      body = raw ? (JSON.parse(raw) as CutoutResponse) : {};
    } catch {
      return {
        ok: false,
        error: `Cutout.pro returned a non-JSON response (HTTP ${response.status}).`,
      };
    }

    if (!response.ok || body.code !== 0 || !body.data?.idPhotoImage) {
      return {
        ok: false,
        code: body.code,
        error: describeCutoutError(response.status, body, raw),
      };
    }

    return {
      ok: true,
      orderId: `cutout_${crypto.randomUUID()}`,
      idPhotoImage: body.data.idPhotoImage,
      printLayoutImage: body.data.printLayoutImage || body.data.idPhotoImage,
      idPhotoCount: body.data.idPhotoCount ?? 0,
      mmWidth,
      mmHeight,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        ok: false,
        error: "Cutout.pro took too long to respond. Wait a moment and try the photo again.",
      };
    }
    const message = error instanceof Error ? error.message : "Network error";
    return {
      ok: false,
      error: `Could not reach Cutout.pro. ${message}`,
    };
  } finally {
    clearTimeout(timer);
  }
}
