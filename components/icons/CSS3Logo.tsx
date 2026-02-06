export default function CSS3Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* B&W like other skills: white outline shield + white text */}
      <path
        d="M64 22 L92 28 L92 58 Q92 88 64 98 Q36 88 36 58 L36 28 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <text
        x="64"
        y="48"
        textAnchor="middle"
        fill="currentColor"
        fontSize="18"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        CSS
      </text>
      <text
        x="64"
        y="82"
        textAnchor="middle"
        fill="currentColor"
        fontSize="42"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        3
      </text>
    </svg>
  );
}
