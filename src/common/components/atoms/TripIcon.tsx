/**
 * Rolling suitcase with a location pin — "going on a trip". Drawn on Phosphor's 256 grid
 * with its thin stroke (8) so it sits next to Phosphor icons without looking foreign.
 */
export default function TripIcon({ size = 24, className }: { size?: number; weight?: string; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* handle */}
      <path d="M74 88V48h48v40" />
      {/* body */}
      <rect x="42" y="88" width="112" height="120" rx="16" />
      {/* straps */}
      <line x1="74" y1="112" x2="74" y2="184" />
      <line x1="122" y1="112" x2="122" y2="184" />
      {/* wheels */}
      <circle cx="66" cy="224" r="8" />
      <circle cx="130" cy="224" r="8" />
      {/* location pin */}
      <path d="M186 104s-28-26-28-46a28 28 0 0 1 56 0c0 20-28 46-28 46Z" />
      <circle cx="186" cy="58" r="8" />
    </svg>
  );
}
