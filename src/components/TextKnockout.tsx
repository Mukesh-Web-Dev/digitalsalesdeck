"use client";

/**
 * TextKnockout Component
 * 
 * Implements the cinematic "Out to In" text knockout effect.
 * Uses a native SVG mask to punch a hole through a dark overlay, revealing
 * the underlying video while the overlay fades in. This provides 60FPS
 * smooth animations compared to heavy CSS filters.
 * 
 * @param {boolean} show - Determines whether the knockout overlay should be rendered.
 */
export default function TextKnockout({ show, text = "MALL OF AMERICA", fontSize = "8vw" }: { show: boolean, text?: string, fontSize?: string }) {
  if (!show) return null;

  const maskId = `textMask-${text.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div className="knockout-overlay" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <defs>
          <mask id={maskId}>
            {/* White background makes the black rect opaque */}
            <rect width="100%" height="100%" fill="white" fillOpacity="0.99" />
            {/* Black text punches a hole through the mask */}
            <text
              className="knockout-text"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={fontSize}
              fontWeight="600"
              fill="black"
              fontFamily="Satoshi, sans-serif"
              letterSpacing="4px"
            >
              {text}
            </text>
          </mask>
        </defs>
        {/* The overlay layer that gets masked */}
        <rect width="100%" height="100%" fill="black" mask={`url(#${maskId})`} />
      </svg>
    </div>
  );
}
