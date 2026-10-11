/**
 * Hands a user-selected photo or an already-open camera stream from a
 * landing-page click into the make-photo editor without a second gesture.
 * Memory only — cleared once the editor claims it.
 */

let stagedFile: File | null = null;
let stagedFileGeneration = 0;
let stagedStream: MediaStream | null = null;

export function stagePhotoUpload(file: File): number {
  stagedFile = file;
  stagedFileGeneration += 1;
  return stagedFileGeneration;
}

export function readStagedPhotoUpload(): {
  file: File;
  generation: number;
} | null {
  if (!stagedFile) {
    return null;
  }
  return { file: stagedFile, generation: stagedFileGeneration };
}

export function clearStagedPhotoUpload(generation: number) {
  if (stagedFileGeneration === generation) {
    stagedFile = null;
  }
}

export function stageCameraStream(stream: MediaStream) {
  if (stagedStream && stagedStream !== stream) {
    stagedStream.getTracks().forEach((track) => track.stop());
  }
  stagedStream = stream;
}

export function readStagedCameraStream(): MediaStream | null {
  return stagedStream;
}

export function clearStagedCameraStream() {
  stagedStream = null;
}
