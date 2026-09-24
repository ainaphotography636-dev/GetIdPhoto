/**
 * Converts an uploaded photo to a standard JPEG File using the browser
 * (canvas / createImageBitmap). HEIC/HEIF is decoded with heic2any first
 * because most browsers cannot draw those formats onto a canvas.
 */

const JPEG_QUALITY = 0.92;
const MAX_EDGE = 4096;

export class ImageConversionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageConversionError";
  }
}

export const HEIC_UPLOAD_HELP_MESSAGE =
  "We couldn't process this photo. Please try selecting it again, or in your Photos app tap Share → Save as JPEG / Export as JPEG, then upload that file.";

export const API_PHOTO_ERROR_MESSAGE =
  "We couldn't create your passport photo. Please try again.";

function isHeicOrHeif(file: File): boolean {
  const type = (file.type || "").toLowerCase();
  if (
    type === "image/heic" ||
    type === "image/heif" ||
    type === "image/heic-sequence" ||
    type === "image/heif-sequence"
  ) {
    return true;
  }

  return /\.hei[cf]$/i.test(file.name);
}

function isStandardJpeg(file: File): boolean {
  const type = (file.type || "").toLowerCase();
  return (
    (type === "image/jpeg" || type === "image/jpg") &&
    file.size > 0 &&
    !isHeicOrHeif(file)
  );
}

function jpegFileName(originalName: string): string {
  const base = originalName.replace(/\.[^/.]+$/, "") || "photo";
  return `${base}.jpg`;
}

function toJpegFile(blob: Blob, originalName: string): File {
  return new File([blob], jpegFileName(originalName), {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

async function decodeHeic(file: File): Promise<Blob> {
  const heic2any = (await import("heic2any")).default;
  const converted = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: JPEG_QUALITY,
  });
  const blob = Array.isArray(converted) ? converted[0] : converted;

  if (!blob || !(blob instanceof Blob) || blob.size === 0) {
    throw new ImageConversionError(HEIC_UPLOAD_HELP_MESSAGE);
  }

  return blob;
}

function loadImageElement(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new ImageConversionError(HEIC_UPLOAD_HELP_MESSAGE));
    };
    img.src = url;
  });
}

async function decodeImage(
  blob: Blob,
): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(blob);
    } catch {
      // Some browsers reject formats createImageBitmap cannot decode.
    }
  }

  return loadImageElement(blob);
}

async function blobToJpegViaCanvas(blob: Blob): Promise<Blob> {
  if (typeof document === "undefined") {
    throw new ImageConversionError(HEIC_UPLOAD_HELP_MESSAGE);
  }

  const source = await decodeImage(blob);
  const width = "width" in source ? source.width : 0;
  const height = "height" in source ? source.height : 0;

  try {
    if (!width || !height) {
      throw new ImageConversionError(HEIC_UPLOAD_HELP_MESSAGE);
    }

    const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));

    const context = canvas.getContext("2d");
    if (!context) {
      throw new ImageConversionError(HEIC_UPLOAD_HELP_MESSAGE);
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(source, 0, 0, canvas.width, canvas.height);

    const jpegBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result || result.size === 0) {
            reject(new ImageConversionError(HEIC_UPLOAD_HELP_MESSAGE));
            return;
          }
          resolve(result);
        },
        "image/jpeg",
        JPEG_QUALITY,
      );
    });

    return jpegBlob;
  } finally {
    if ("close" in source && typeof source.close === "function") {
      source.close();
    }
  }
}

/**
 * Returns a JPEG File. Existing JPEGs pass through. HEIC, PNG, WebP, and
 * other browser-decodable images are re-encoded on a canvas. Throws
 * ImageConversionError when a JPEG cannot be produced.
 */
export async function ensureJpegFile(file: File): Promise<File> {
  if (isStandardJpeg(file)) {
    return file;
  }

  const candidates: Blob[] = [];

  if (isHeicOrHeif(file)) {
    try {
      candidates.push(await decodeHeic(file));
    } catch (err) {
      console.warn(
        "[HEIC] heic2any failed; trying the browser image decoder.",
        {
          name: file.name,
          type: file.type,
          size: file.size,
          error: err,
        },
      );
    }
  }

  candidates.push(file);

  let lastError: unknown;
  for (const candidate of candidates) {
    try {
      const jpegBlob = await blobToJpegViaCanvas(candidate);
      return toJpegFile(jpegBlob, file.name);
    } catch (err) {
      lastError = err;
      if (
        candidate !== file &&
        candidate.type === "image/jpeg" &&
        candidate.size > 0
      ) {
        return toJpegFile(candidate, file.name);
      }
    }
  }

  console.error("[image] Failed to convert upload to JPEG.", {
    name: file.name,
    type: file.type,
    size: file.size,
    error: lastError,
  });
  throw new ImageConversionError(HEIC_UPLOAD_HELP_MESSAGE);
}

export function describePhotoUploadError(err: unknown): string {
  if (err instanceof ImageConversionError) {
    return err.message || HEIC_UPLOAD_HELP_MESSAGE;
  }

  if (err instanceof Error) {
    if (/timed out/i.test(err.message)) {
      return "The photo service took too long to respond. Please wait a moment and try again.";
    }

    const statusMatch = err.message.match(/status:\s*(\d+)\s*([\s\S]*)/i);
    if (statusMatch) {
      const detail = statusMatch[2]?.trim();
      return detail
        ? `We couldn't create your passport photo right now (error ${statusMatch[1]}): ${detail}`
        : `We couldn't create your passport photo right now (error ${statusMatch[1]}). Please try again.`;
    }

    if (/failed to fetch|networkerror|load failed/i.test(err.message)) {
      return "We couldn't reach the photo service. Check your connection and try again.";
    }
  }

  return API_PHOTO_ERROR_MESSAGE;
}
