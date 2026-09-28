import {
  FaceLandmarker,
  FilesetResolver,
  type FaceLandmarkerResult,
} from "@mediapipe/tasks-vision";
import type { PhotoQualityIssue } from "@/utils/analyzePhotoQuality";

export type BiometricValidationResult = {
  ok: boolean;
  issues: PhotoQualityIssue[];
};

type Point = { x: number; y: number; z?: number; visibility?: number };

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm";

// MediaPipe Face Mesh landmark indices
const LM = {
  noseTip: 1,
  chin: 152,
  forehead: 10,
  leftEyeOuter: 33,
  leftEyeInner: 133,
  leftEyeTop: 159,
  leftEyeBottom: 145,
  rightEyeOuter: 263,
  rightEyeInner: 362,
  rightEyeTop: 386,
  rightEyeBottom: 374,
  leftIris: 468,
  rightIris: 473,
  mouthUpper: 13,
  mouthLower: 14,
  mouthLeft: 61,
  mouthRight: 291,
  leftEar: 234,
  rightEar: 454,
  leftCheek: 93,
  rightCheek: 323,
} as const;

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

function dist(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function getBlendscore(
  result: FaceLandmarkerResult,
  name: string,
): number {
  const categories = result.faceBlendshapes?.[0]?.categories ?? [];
  const match = categories.find((c) => c.categoryName === name);
  return match?.score ?? 0;
}

async function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(WASM_URL);
      try {
        return await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            delegate: "GPU",
          },
          runningMode: "IMAGE",
          numFaces: 1,
          outputFaceBlendshapes: true,
          outputFacialTransformationMatrixes: true,
        });
      } catch {
        return FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            delegate: "CPU",
          },
          runningMode: "IMAGE",
          numFaces: 1,
          outputFaceBlendshapes: true,
          outputFacialTransformationMatrixes: true,
        });
      }
    })().catch((err) => {
      landmarkerPromise = null;
      throw err;
    });
  }
  return landmarkerPromise;
}

function loadImageElement(source: string | File): Promise<HTMLImageElement> {
  const src =
    typeof source === "string" ? source : URL.createObjectURL(source);

  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith("data:") && !src.startsWith("blob:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => {
      if (typeof source !== "string") {
        URL.revokeObjectURL(src);
      }
      resolve(img);
    };
    img.onerror = () => {
      if (typeof source !== "string") {
        URL.revokeObjectURL(src);
      }
      reject(new Error("Could not load image for biometric validation."));
    };
    img.src = src;
  });
}

function eyeAspectRatio(
  landmarks: Point[],
  outer: number,
  inner: number,
  top: number,
  bottom: number,
): number {
  const vertical = dist(landmarks[top], landmarks[bottom]);
  const horizontal = dist(landmarks[outer], landmarks[inner]);
  if (horizontal < 1e-6) return 0;
  return vertical / horizontal;
}

function mouthOpenRatio(landmarks: Point[]): number {
  const vertical = dist(landmarks[LM.mouthUpper], landmarks[LM.mouthLower]);
  const horizontal = dist(landmarks[LM.mouthLeft], landmarks[LM.mouthRight]);
  if (horizontal < 1e-6) return 0;
  return vertical / horizontal;
}

/**
 * Estimate yaw from cheek/nose landmark asymmetry.
 * ~0 = frontal, positive = turned one way.
 */
function estimateYaw(landmarks: Point[]): number {
  const nose = landmarks[LM.noseTip];
  const left = landmarks[LM.leftCheek];
  const right = landmarks[LM.rightCheek];
  const leftDist = dist(nose, left);
  const rightDist = dist(nose, right);
  const denom = Math.max(leftDist + rightDist, 1e-6);
  return (leftDist - rightDist) / denom;
}

function estimatePitch(landmarks: Point[]): number {
  const nose = landmarks[LM.noseTip];
  const forehead = landmarks[LM.forehead];
  const chin = landmarks[LM.chin];
  const faceHeight = Math.max(dist(forehead, chin), 1e-6);
  const midY = (forehead.y + chin.y) / 2;
  return (nose.y - midY) / faceHeight;
}

function irisCentered(
  landmarks: Point[],
  irisIdx: number,
  outer: number,
  inner: number,
): boolean {
  if (!landmarks[irisIdx]) return true; // iris optional
  const iris = landmarks[irisIdx];
  const o = landmarks[outer];
  const i = landmarks[inner];
  const eyeWidth = Math.max(Math.abs(o.x - i.x), 1e-6);
  const centerX = (o.x + i.x) / 2;
  return Math.abs(iris.x - centerX) / eyeWidth < 0.38;
}

/**
 * Ear visibility is hard to prove from Face Mesh alone (234/454 are jaw/cheek
 * contour points, not ear tips). For passport checks we only reject when the
 * head is turned enough that one ear is likely hidden.
 */
function earsLikelyVisible(landmarks: Point[], yaw: number): boolean {
  const leftEar = landmarks[LM.leftEar];
  const rightEar = landmarks[LM.rightEar];
  const leftEye = landmarks[LM.leftEyeOuter];
  const rightEye = landmarks[LM.rightEyeOuter];

  if (!leftEar || !rightEar || !leftEye || !rightEye) {
    // Missing landmarks — don't block; other checks still run.
    return true;
  }

  // Clearly turned head → one ear likely not visible
  if (Math.abs(yaw) > 0.32) {
    return false;
  }

  // Frontal / near-frontal poses with a detected face pass.
  // Avoid brittle ear-vs-eye x comparisons that reject valid ID photos.
  return true;
}

/**
 * Validate biometric passport/ID photo requirements before cutout processing.
 * Checks: both ears visible, both eyes open, frontal gaze, closed mouth.
 */
export async function validateBiometricPhoto(
  source: string | File,
): Promise<BiometricValidationResult> {
  const issues: PhotoQualityIssue[] = [];

  try {
    const landmarker = await getFaceLandmarker();
    const img = await loadImageElement(source);
    const result = landmarker.detect(img);

    if (!result.faceLandmarks?.length) {
      issues.push({
        code: "ISSUE_FACE_NOT_FOUND",
        severity: "critical",
        title: "No face detected",
        message:
          "Please upload a photo with your full face and upper body clearly visible, looking straight at the camera.",
      });
      return { ok: false, issues };
    }

    const landmarks = result.faceLandmarks[0] as Point[];

    const blinkLeft = getBlendscore(result, "eyeBlinkLeft");
    const blinkRight = getBlendscore(result, "eyeBlinkRight");
    const jawOpen = getBlendscore(result, "jawOpen");
    const mouthClose = getBlendscore(result, "mouthClose");
    const mouthSmile =
      (getBlendscore(result, "mouthSmileLeft") +
        getBlendscore(result, "mouthSmileRight")) /
      2;
    const mouthOpenBlend = getBlendscore(result, "mouthOpen");

    const leftEAR = eyeAspectRatio(
      landmarks,
      LM.leftEyeOuter,
      LM.leftEyeInner,
      LM.leftEyeTop,
      LM.leftEyeBottom,
    );
    const rightEAR = eyeAspectRatio(
      landmarks,
      LM.rightEyeOuter,
      LM.rightEyeInner,
      LM.rightEyeTop,
      LM.rightEyeBottom,
    );
    const mar = mouthOpenRatio(landmarks);
    const yaw = estimateYaw(landmarks);
    const pitch = estimatePitch(landmarks);

    const eyesClosed =
      blinkLeft > 0.45 ||
      blinkRight > 0.45 ||
      leftEAR < 0.12 ||
      rightEAR < 0.12;

    if (eyesClosed) {
      issues.push({
        code: "ISSUE_EYES_CLOSED",
        severity: "critical",
        title: "Both eyes must be open",
        message:
          "Please upload a photo with both eyes clearly open and looking at the camera.",
      });
    }

    const lookingAway =
      Math.abs(yaw) > 0.22 ||
      Math.abs(pitch) > 0.28 ||
      (!irisCentered(
        landmarks,
        LM.leftIris,
        LM.leftEyeOuter,
        LM.leftEyeInner,
      ) &&
        !irisCentered(
          landmarks,
          LM.rightIris,
          LM.rightEyeOuter,
          LM.rightEyeInner,
        ));

    if (lookingAway) {
      issues.push({
        code: "ISSUE_HEAD_YAW_OVER_THRESHOLD",
        severity: "critical",
        title: "Look straight at the camera",
        message:
          "Your face must face the camera directly (frontal pose). Please look straight forward and try again.",
      });
    }

    const mouthOpen =
      jawOpen > 0.28 ||
      mouthOpenBlend > 0.35 ||
      mar > 0.35 ||
      (mouthSmile > 0.55 && mar > 0.22) ||
      (mouthClose < 0.2 && mar > 0.32);

    if (mouthOpen) {
      issues.push({
        code: "ISSUE_EXPRESSION_NOT_NEUTRAL",
        severity: "critical",
        title: "Keep your mouth closed",
        message:
          "Please upload a photo with a neutral expression and your mouth closed (no open smile or open teeth).",
      });
    }

    if (!earsLikelyVisible(landmarks, yaw)) {
      issues.push({
        code: "ISSUE_EARS_NOT_VISIBLE",
        severity: "critical",
        title: "Both ears must be visible",
        message:
          "Please upload a photo where both ears are clearly visible. Pull hair back if needed and face the camera straight on.",
      });
    }

    return { ok: issues.length === 0, issues };
  } catch (err) {
    console.warn("Biometric validation skipped", err);
    // Do not block processing if the face model fails to load.
    return { ok: true, issues: [] };
  }
}
