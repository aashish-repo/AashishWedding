/**
 * Digambar Jain Sathiya (right-facing स्वस्तिक / साथिया)
 * Four bent arms + four dots (चतुर्गति)
 */
export function Sathiya({ className }: { className?: string }) {
  return (
    <div className={className ?? "sathiya"} aria-label="Jain Sathiya">
      <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
        <g fill="currentColor">
          {/* Vertical stem */}
          <rect x="41" y="8" width="18" height="84" />
          {/* Horizontal stem */}
          <rect x="8" y="41" width="84" height="18" />
          {/* Clockwise bent ends */}
          <rect x="59" y="8" width="33" height="18" />
          <rect x="74" y="59" width="18" height="33" />
          <rect x="8" y="74" width="33" height="18" />
          <rect x="8" y="8" width="18" height="33" />
          {/* Four dots — four gatis / fourfold sangha */}
          <circle cx="29" cy="29" r="5.5" />
          <circle cx="71" cy="29" r="5.5" />
          <circle cx="29" cy="71" r="5.5" />
          <circle cx="71" cy="71" r="5.5" />
        </g>
      </svg>
    </div>
  );
}
