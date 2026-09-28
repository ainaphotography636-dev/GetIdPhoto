export type PhotoQualityIssue = {
  code:
    | "ISSUE_PHOTO_SHARPNESS_BAD"
    | "ISSUE_FACE_BRIGHTNESS_BAD"
    | "ISSUE_FACE_LIGHT_NOT_BALANCE"
    | "ISSUE_PHOTO_TOO_SMALL"
    | "ISSUE_PHOTO_TOO_DARK"
    | "ISSUE_PHOTO_TOO_BRIGHT"
    | "ISSUE_QUALITY_CHECK_FAILED"
    | "ISSUE_FACE_NOT_FOUND"
    | "ISSUE_EYES_CLOSED"
    | "ISSUE_HEAD_YAW_OVER_THRESHOLD"
    | "ISSUE_EXPRESSION_NOT_NEUTRAL"
    | "ISSUE_EARS_NOT_VISIBLE";
  severity: "warning" | "critical";
  title: string;
  message: string;
};

export type PhotoQualityReport = {
  ok: boolean;
  score: "good" | "fair" | "poor";
  sharpness: number;
  brightness: number;
  issues: PhotoQualityIssue[];
};

const USER_FACING_CODES = new Set([
  "ISSUE_PHOTO_SHARPNESS_BAD",
  "ISSUE_PHOTO_TOO_DARK",
  "ISSUE_PHOTO_TOO_SMALL",
]);

/** True when we should show a short warning above the action buttons. */
export function hasUserFacingQualityIssue(
  report: PhotoQualityReport | null | undefined,
): boolean {
  if (!report) return false;
  return report.issues.some(
    (issue) =>
      USER_FACING_CODES.has(issue.code) && issue.severity === "critical",
  );
}

export function userFacingQualityMessage(
  report: PhotoQualityReport,
): string | null {
  if (!hasUserFacingQualityIssue(report)) return null;

  const codes = new Set(report.issues.map((i) => i.code));
  if (codes.has("ISSUE_PHOTO_SHARPNESS_BAD")) {
    return "Photo looks blurry.";
  }
  if (codes.has("ISSUE_PHOTO_TOO_DARK")) {
    return "Photo is too dark.";
  }
  if (codes.has("ISSUE_PHOTO_TOO_SMALL")) {
    return "Photo resolution is too low.";
  }
  return "Photo quality may need improvement.";
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith("data:") && !src.startsWith("blob:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error("Could not load image for quality check."));
    img.src = src;
  });
}

function centerLaplacianVariance(
  gray: Float32Array,
  width: number,
  height: number,
  centerFraction = 0.55,
): number {
  const x0 = Math.floor((width * (1 - centerFraction)) / 2);
  const y0 = Math.floor((height * (1 - centerFraction)) / 2);
  const x1 = width - x0;
  const y1 = height - y0;

  let sum = 0;
  let sumSq = 0;
  let count = 0;

  for (let y = Math.max(1, y0); y < Math.min(height - 1, y1); y++) {
    for (let x = Math.max(1, x0); x < Math.min(width - 1, x1); x++) {
      const i = y * width + x;
      const value =
        -gray[i - width] -
        gray[i - 1] +
        4 * gray[i] -
        gray[i + 1] -
        gray[i + width];
      sum += value;
      sumSq += value * value;
      count++;
    }
  }

  if (count === 0) {
    return 0;
  }
  const mean = sum / count;
  return sumSq / count - mean * mean;
}

function centerLocalContrast(
  gray: Float32Array,
  width: number,
  height: number,
): number {
  const x0 = Math.floor(width * 0.22);
  const y0 = Math.floor(height * 0.18);
  const x1 = Math.floor(width * 0.78);
  const y1 = Math.floor(height * 0.72);

  let sum = 0;
  let count = 0;
  for (let y = Math.max(1, y0); y < Math.min(height - 1, y1); y++) {
    for (let x = Math.max(1, x0); x < Math.min(width - 1, x1); x++) {
      const i = y * width + x;
      const blur =
        (gray[i - width - 1] +
          gray[i - width] +
          gray[i - width + 1] +
          gray[i - 1] +
          gray[i] +
          gray[i + 1] +
          gray[i + width - 1] +
          gray[i + width] +
          gray[i + width + 1]) /
        9;
      sum += Math.abs(gray[i] - blur);
      count++;
    }
  }
  return count === 0 ? 0 : sum / count;
}

function regionAverage(
  gray: Float32Array,
  width: number,
  height: number,
): number {
  const x0 = Math.floor(width * 0.25);
  const y0 = Math.floor(height * 0.2);
  const x1 = Math.floor(width * 0.75);
  const y1 = Math.floor(height * 0.7);
  let sum = 0;
  let count = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      sum += gray[y * width + x];
      count++;
    }
  }
  return count === 0 ? 0 : sum / count;
}

export function unknownQualityReport(
  message = "We could not fully verify photo quality.",
): PhotoQualityReport {
  return {
    ok: false,
    score: "poor",
    sharpness: 0,
    brightness: 0,
    issues: [
      {
        code: "ISSUE_QUALITY_CHECK_FAILED",
        severity: "critical",
        title: "Could not verify photo quality",
        message,
      },
    ],
  };
}

export type AnalyzePhotoQualityOptions = {
  skipSizeCheck?: boolean;
  /** Original upload byte size — used to avoid false low-res on camera files. */
  fileBytes?: number;
};

/**
 * Detect clearly bad uploads (blur / very dark / tiny).
 * Does not flag normal camera or passport-crop sizes as low resolution.
 */
export async function analyzePhotoQuality(
  source: string | File,
  options: AnalyzePhotoQualityOptions = {},
): Promise<PhotoQualityReport> {
  const src =
    typeof source === "string" ? source : URL.createObjectURL(source);
  const fileBytes =
    options.fileBytes ??
    (typeof source === "string" ? undefined : source.size);

  try {
    const img = await loadImage(src);
    const maxSide = 480;
    const scale = Math.min(
      1,
      maxSide / Math.max(img.naturalWidth, img.naturalHeight),
    );
    const width = Math.max(32, Math.round(img.naturalWidth * scale));
    const height = Math.max(32, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      throw new Error("Canvas is not available for quality checks.");
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, width, height);
    const { data } = ctx.getImageData(0, 0, width, height);

    const gray = new Float32Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        gray[y * width + x] =
          0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }
    }

    const brightness = regionAverage(gray, width, height);
    const sharpness = centerLaplacianVariance(gray, width, height, 0.55);
    const localContrast = centerLocalContrast(gray, width, height);

    const issues: PhotoQualityIssue[] = [];

    // Only tiny thumbnail-like files (never a multi-MB camera photo)
    const isTinyFile =
      !options.skipSizeCheck &&
      img.naturalWidth > 0 &&
      img.naturalHeight > 0 &&
      img.naturalWidth < 280 &&
      img.naturalHeight < 280 &&
      (fileBytes == null || fileBytes < 80_000);

    if (isTinyFile) {
      issues.push({
        code: "ISSUE_PHOTO_TOO_SMALL",
        severity: "critical",
        title: "Photo resolution is too low",
        message: "This image is too small for a clear ID photo.",
      });
    }

    // Blurry when either metric is clearly low
    if (sharpness < 140 || localContrast < 1.35) {
      issues.push({
        code: "ISSUE_PHOTO_SHARPNESS_BAD",
        severity: "critical",
        title: "Photo looks blurry",
        message: "The photo is not sharp enough.",
      });
    }

    if (brightness < 48) {
      issues.push({
        code: "ISSUE_PHOTO_TOO_DARK",
        severity: "critical",
        title: "Photo is too dark",
        message: "Lighting is too low.",
      });
    }

    const hasCritical = issues.some((issue) => issue.severity === "critical");

    return {
      ok: !hasCritical,
      score: hasCritical ? "poor" : "good",
      sharpness,
      brightness,
      issues,
    };
  } finally {
    if (typeof source !== "string") {
      URL.revokeObjectURL(src);
    }
  }
}
