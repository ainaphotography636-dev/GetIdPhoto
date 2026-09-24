import sharp from "sharp";
import { allPhotoSpecs } from "@/models/PhotoSpec";

const PRINT_DPI = 600;
/** Standard 4×6 inch postcard, portrait, at 600 DPI. */
const SHEET_WIDTH = 4 * PRINT_DPI;
const SHEET_HEIGHT = 6 * PRINT_DPI;

function pixelsAtDpi(size: number, unit: string, dpi: number): number {
  if (unit === "mm") {
    return Math.round((size / 25.4) * dpi);
  }
  if (unit === "inch" || unit === "in") {
    return Math.round(size * dpi);
  }
  return Math.round(size);
}

export function photoPixelsAt600Dpi(specCode: string | null | undefined): {
  width: number;
  height: number;
} {
  const spec = specCode ? allPhotoSpecs[specCode as keyof typeof allPhotoSpecs] : undefined;
  if (!spec) {
    return { width: pixelsAtDpi(40, "mm", PRINT_DPI), height: pixelsAtDpi(60, "mm", PRINT_DPI) };
  }
  return {
    width: pixelsAtDpi(spec.widthUnit, spec.unit, PRINT_DPI),
    height: pixelsAtDpi(spec.heightUnit, spec.unit, PRINT_DPI),
  };
}

async function resizedPhoto(source: Buffer, width: number, height: number): Promise<Buffer> {
  return sharp(source)
    .resize(width, height, { fit: "fill" })
    .jpeg({ quality: 95 })
    .withMetadata({ density: PRINT_DPI })
    .toBuffer();
}

export async function buildSinglePhoto(
  source: Buffer,
  specCode: string | null | undefined,
): Promise<Buffer> {
  const { width, height } = photoPixelsAt600Dpi(specCode);
  return resizedPhoto(source, width, height);
}

export async function buildPostcardSheet(
  source: Buffer,
  specCode: string | null | undefined,
): Promise<Buffer> {
  const { width, height } = photoPixelsAt600Dpi(specCode);
  const maxWidth = Math.floor(SHEET_WIDTH / 2) - 40;
  const maxHeight = Math.floor(SHEET_HEIGHT / 2) - 40;
  const scale = Math.min(1, maxWidth / width, maxHeight / height);
  const photoWidth = Math.round(width * scale);
  const photoHeight = Math.round(height * scale);
  const photo = await resizedPhoto(source, photoWidth, photoHeight);

  const gapX = Math.floor((SHEET_WIDTH - photoWidth * 2) / 3);
  const gapY = Math.floor((SHEET_HEIGHT - photoHeight * 2) / 3);
  const positions = [
    { left: gapX, top: gapY },
    { left: gapX * 2 + photoWidth, top: gapY },
    { left: gapX, top: gapY * 2 + photoHeight },
    { left: gapX * 2 + photoWidth, top: gapY * 2 + photoHeight },
  ];

  return sharp({
    create: {
      width: SHEET_WIDTH,
      height: SHEET_HEIGHT,
      channels: 3,
      background: "#ffffff",
    },
  })
    .composite(positions.map((position) => ({ input: photo, ...position })))
    .jpeg({ quality: 95 })
    .withMetadata({ density: PRINT_DPI })
    .toBuffer();
}
