/**
 * Detects Apple HEIC/HEIF images and converts them to JPEG File objects
 * so they can be processed by standard web image pipelines (e.g. idphoto.ai).
 *
 * If conversion fails (unsupported HEIC variants / compression), the original
 * file is returned so the upload flow can still attempt the API.
 */

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

  // iOS often omits MIME type or reports an empty string; fall back to extension.
  return /\.hei[cf]$/i.test(file.name);
}

function jpegFileName(originalName: string): string {
  const base = originalName.replace(/\.[^/.]+$/, "") || "photo";
  return `${base}.jpg`;
}

/**
 * If the file is HEIC/HEIF, convert it client-side to a JPEG File.
 * On conversion failure, logs the error and returns the original file.
 * Non-HEIC files are returned unchanged.
 */
export async function ensureJpegFile(file: File): Promise<File> {
  if (!isHeicOrHeif(file)) {
    return file;
  }

  try {
    // Dynamic import keeps heic2any (WASM/worker) out of the SSR bundle.
    const heic2any = (await import("heic2any")).default;

    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.92,
    });

    const blob = Array.isArray(converted) ? converted[0] : converted;

    if (!blob || !(blob instanceof Blob) || blob.size === 0) {
      console.warn(
        "[HEIC] Conversion returned an empty result; using original file.",
        file.name,
      );
      return file;
    }

    return new File([blob], jpegFileName(file.name), {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch (err) {
    console.warn(
      "[HEIC] heic2any failed to convert; passing original file to the API.",
      {
        name: file.name,
        type: file.type,
        size: file.size,
        error: err,
      },
    );
    return file;
  }
}

export const HEIC_UPLOAD_HELP_MESSAGE =
  "We couldn't process this photo. Please try selecting it again, or in your Photos app tap Share → Save as JPEG / Export as JPEG, then upload that file.";
