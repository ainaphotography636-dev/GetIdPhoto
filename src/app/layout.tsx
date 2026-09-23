import type { Metadata } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { constants } from "@/constants";

const gitVersion = process.env.GIT_COMMIT_SHA;

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: `${constants.studioName} | GetIDPhotoAI.ae`,
  description: constants.studioDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="version" content={gitVersion} />
      </head>
      <body
        className={`${outfit.variable} ${sourceSerif.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
