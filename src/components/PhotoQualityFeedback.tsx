import {
  hasUserFacingQualityIssue,
  userFacingQualityMessage,
  type PhotoQualityReport,
} from "@/utils/analyzePhotoQuality";

type PhotoQualityFeedbackProps = {
  report: PhotoQualityReport;
};

export default function PhotoQualityFeedback({
  report,
}: PhotoQualityFeedbackProps) {
  if (!hasUserFacingQualityIssue(report)) {
    return null;
  }

  const message = userFacingQualityMessage(report);
  if (!message) {
    return null;
  }

  return (
    <p className="mb-3 max-w-lg text-center text-sm text-amber-700">
      {message}
    </p>
  );
}
