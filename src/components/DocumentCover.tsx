export type CoverKind = "passport" | "id" | "visa" | "print";

type DocumentCoverProps = {
  kind: CoverKind;
  color: string;
  label: string;
};

function PassportCover({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 160 214" className="h-full w-full" aria-hidden>
      <rect x="6" y="6" width="148" height="202" rx="8" fill={color} />
      <rect x="6" y="6" width="14" height="202" rx="4" fill="rgba(0,0,0,0.18)" />
      <rect
        x="22"
        y="18"
        width="118"
        height="178"
        rx="4"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.4"
      />
      <circle
        cx="81"
        cy="86"
        r="26"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.4"
      />
      <circle cx="81" cy="86" r="16" fill="rgba(255,255,255,0.12)" />
      <path
        d="M81 74.5l2.4 6.4h6.7l-5.4 4 2.1 6.6-5.8-4-5.8 4 2.1-6.6-5.4-4h6.7z"
        fill="rgba(255,255,255,0.9)"
      />
      <text
        x="81"
        y="132"
        textAnchor="middle"
        fill="rgba(255,255,255,0.92)"
        fontSize="11"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="2.2"
      >
        PASSPORT
      </text>
      <text
        x="81"
        y="154"
        textAnchor="middle"
        fill="rgba(255,255,255,0.78)"
        fontSize="9"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1.2"
      >
        {label}
      </text>
    </svg>
  );
}

function IdCover({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 220 140" className="h-full w-full" aria-hidden>
      <rect x="4" y="8" width="212" height="124" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="4" y="8" width="212" height="28" rx="10" fill={color} />
      <rect x="4" y="24" width="212" height="12" fill={color} />
      <text
        x="16"
        y="27"
        fill="white"
        fontSize="11"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1.1"
      >
        {label}
      </text>
      <rect x="16" y="48" width="46" height="58" rx="4" fill="#e2e8f0" />
      <circle cx="39" cy="68" r="10" fill="#cbd5e1" />
      <path d="M24 100c4-10 10-14 15-14s11 4 15 14" fill="#cbd5e1" />
      <rect x="74" y="52" width="88" height="6" rx="3" fill="#e2e8f0" />
      <rect x="74" y="66" width="70" height="6" rx="3" fill="#e2e8f0" />
      <rect x="74" y="80" width="78" height="6" rx="3" fill="#e2e8f0" />
      <rect x="168" y="96" width="28" height="20" rx="3" fill={color} opacity="0.85" />
    </svg>
  );
}

function VisaCover({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
      <rect x="6" y="6" width="188" height="128" rx="6" fill="#fffef9" stroke="#e7e5e4" />
      <rect x="6" y="6" width="188" height="22" rx="6" fill={color} />
      <rect x="6" y="18" width="188" height="10" fill={color} />
      <text
        x="16"
        y="21"
        fill="white"
        fontSize="10"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="1.4"
      >
        {label}
      </text>
      <rect x="16" y="42" width="36" height="44" rx="2" fill="#e7e5e4" />
      <rect x="60" y="44" width="72" height="5" rx="2" fill="#e7e5e4" />
      <rect x="60" y="56" width="58" height="5" rx="2" fill="#e7e5e4" />
      <rect x="60" y="68" width="64" height="5" rx="2" fill="#e7e5e4" />
      <circle
        cx="156"
        cy="96"
        r="22"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.7"
      />
      <text
        x="156"
        y="99"
        textAnchor="middle"
        fill={color}
        fontSize="8"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="0.6"
      >
        VISA
      </text>
    </svg>
  );
}

function PrintCover({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 140 180" className="h-full w-full" aria-hidden>
      <rect x="8" y="6" width="124" height="168" rx="4" fill="white" stroke="#e2e8f0" />
      <rect x="20" y="18" width="100" height="112" fill="#f1f5f9" />
      <circle cx="70" cy="62" r="16" fill="#cbd5e1" />
      <path d="M42 118c8-20 16-28 28-28s20 8 28 28" fill="#cbd5e1" />
      <rect x="20" y="140" width="100" height="16" rx="2" fill={color} />
      <text
        x="70"
        y="152"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="0.8"
      >
        {label}
      </text>
    </svg>
  );
}

export default function DocumentCover({ kind, color, label }: DocumentCoverProps) {
  if (kind === "id") return <IdCover color={color} label={label} />;
  if (kind === "visa") return <VisaCover color={color} label={label} />;
  if (kind === "print") return <PrintCover color={color} label={label} />;
  return <PassportCover color={color} label={label} />;
}
