"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getPrimaryDocumentLinks } from "@/lib/document-catalog";

type ServicesMenuProps = {
  label: string;
  className?: string;
  onViewServices?: () => void;
  viewServicesLabel?: string;
};

export default function ServicesMenu({
  label,
  className = "",
  onViewServices,
  viewServicesLabel,
}: ServicesMenuProps) {
  const [open, setOpen] = useState(false);
  const guides = [...getPrimaryDocumentLinks()].sort((a, b) => {
    if (a.specCode === "uae-id-card") return -1;
    if (b.specCode === "uae-id-card") return 1;
    return 0;
  });

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-1 font-medium text-gray-600 transition-colors hover:text-emerald-600"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <ul
        className={`absolute start-0 top-full z-50 mt-2 min-w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg ${
          open ? "block" : "hidden"
        }`}
      >
          {guides.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                onClick={() => setOpen(false)}
              >
                {guide.specCode === "uae-id-card"
                  ? "Emirates ID Photo"
                  : guide.shortTitle}
              </Link>
            </li>
          ))}
          {onViewServices && viewServicesLabel ? (
            <li className="mt-1 border-t border-slate-100 pt-1">
              <button
                type="button"
                className="block w-full px-4 py-2 text-start text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                onClick={() => {
                  setOpen(false);
                  onViewServices();
                }}
              >
                {viewServicesLabel}
              </button>
            </li>
          ) : null}
      </ul>
    </div>
  );
}
