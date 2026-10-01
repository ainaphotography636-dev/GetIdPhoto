"use client";

import type { ReactNode } from "react";
import { constants } from "@/constants";

type SocialLinksProps = {
  /** Optional section label above the icons */
  label?: string;
  className?: string;
  /** `footer` = larger icons on dark bg; `compact` = smaller for CTA */
  variant?: "footer" | "compact";
};

type SocialItem = {
  id: "facebook" | "instagram" | "tiktok" | "threads";
  href: string;
  label: string;
  hoverClass: string;
  icon: ReactNode;
};

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.174 2.097 15.943 2 14.643 2 11.55 2 9.5 3.897 9.5 7.15V9.5H7v4h2.5V22h4.5v-8.5z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.48V13a8.23 8.23 0 004.78 1.52V11a4.84 4.84 0 01-.8-.08 4.84 4.84 0 01.6-4.23z" />
    </svg>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.213-8.184-3.517C2.35 18.44 1.5 15.586 1.5 12.07c0-3.5.852-6.345 2.533-8.452C5.699 1.554 8.45.358 12.179.333h.028c3.734.025 6.488 1.222 8.183 3.288C22.076 5.726 22.93 8.551 22.93 12.07c0 .484-.026.976-.078 1.462a9.28 9.28 0 0 1-.042.4c-.355 2.566-1.35 4.629-2.957 6.13-1.686 1.574-4.038 2.385-6.993 2.41l-.674-.002zm.14-21.994c-2.837.02-4.934.867-6.232 2.517C4.713 6.037 4.1 8.31 4.1 12.07c0 3.775.615 6.05 1.826 7.398 1.293 1.44 3.388 2.177 6.226 2.2 2.834-.022 4.926-.76 6.211-2.193 1.196-1.336 1.838-3.605 1.905-6.74a13.4 13.4 0 0 0 .033-.9c0-3.766-.614-6.037-1.822-7.389-1.291-1.437-3.387-2.172-6.153-2.19zm4.474 12.203c-.15 1.864-.845 3.25-2.067 4.12-1.068.76-2.48 1.146-4.2 1.146h-.01c-2.63-.02-4.4-.94-5.26-2.73-.62-1.29-.72-2.95-.3-4.94.5-2.37 1.87-3.92 4.08-4.61 1.37-.43 2.94-.55 4.66-.36 1.94.22 3.55.8 4.79 1.73 1.4 1.05 2.24 2.5 2.5 4.31.13.9.1 2.5-.05 3.7-.02.14-.03.28-.05.41-.9-.13-1.83-.26-2.78-.39.13-.97.19-1.86.16-2.64-.07-1.55-.66-2.72-1.76-3.47-.95-.65-2.2-1-3.72-1.05-1.38-.04-2.6.2-3.63.72-1.18.59-1.96 1.5-2.32 2.7-.27.9-.25 1.85.06 2.82.4 1.24 1.32 2.1 2.74 2.55.9.28 1.92.39 3.03.32 1.4-.09 2.55-.5 3.42-1.22.66-.54 1.12-1.26 1.37-2.14.1-.37.15-.73.16-1.07z" />
    </svg>
  );
}

/**
 * Professional serial social icon buttons: Facebook → Instagram → TikTok → Threads.
 */
export default function SocialLinks({
  label,
  className = "",
  variant = "footer",
}: SocialLinksProps) {
  const items: SocialItem[] = [
    {
      id: "facebook",
      href: constants.social.facebook,
      label: "Facebook",
      hoverClass: "hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white",
      icon: <FacebookIcon className="h-[18px] w-[18px]" />,
    },
    {
      id: "instagram",
      href: constants.social.instagram,
      label: "Instagram",
      hoverClass:
        "hover:border-pink-500 hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:text-white",
      icon: <InstagramIcon className="h-[18px] w-[18px]" />,
    },
    {
      id: "tiktok",
      href: constants.social.tiktok,
      label: "TikTok",
      hoverClass: "hover:border-white hover:bg-black hover:text-white",
      icon: <TikTokIcon className="h-[18px] w-[18px]" />,
    },
    {
      id: "threads",
      href: constants.social.threads,
      label: "Threads",
      hoverClass: "hover:border-white hover:bg-white hover:text-gray-900",
      icon: <ThreadsIcon className="h-[18px] w-[18px]" />,
    },
  ];

  const size =
    variant === "compact"
      ? "h-9 w-9"
      : "h-11 w-11";

  return (
    <div className={className}>
      {label ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
          {label}
        </p>
      ) : null}
      <ul className="flex items-center gap-2.5" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              className={[
                "group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition-all duration-200",
                size,
                item.hoverClass,
                "hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
              ].join(" ")}
            >
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
