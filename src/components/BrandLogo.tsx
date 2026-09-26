import Image from "next/image";
import { constants } from "../constants";

type BrandLogoProps = {
  className?: string;
  /** Image height in px; width scales to keep aspect ratio. */
  height?: number;
  /** Use light text variant for dark backgrounds. */
  variant?: "default" | "light";
};

const LOGO_ASPECT = 931 / 276;

export default function BrandLogo({
  className = "",
  height = 64,
  variant = "default",
}: BrandLogoProps) {
  const width = Math.round(height * LOGO_ASPECT);
  const src = variant === "light" ? "/logo-light.png" : "/logo.png";

  return (
    <Image
      src={src}
      alt={constants.studioName || "GetIDPhotoAI"}
      width={width}
      height={height}
      className={`h-auto w-auto object-contain ${className}`}
      style={{ height, width: "auto" }}
      priority
      quality={100}
      unoptimized
    />
  );
}
