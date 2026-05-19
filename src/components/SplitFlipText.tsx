"use client";

import React from "react";

interface SplitFlipTextProps {
  text: string;
  className?: string;
}

/**
 * SplitFlipText Component
 * 
 * Takes a string and splits it into individual words and characters.
 * Generates two layers (.split-flip-before and .split-flip-after) to drive
 * a hardware-accelerated letters flipping animation on hover.
 */
export default function SplitFlipText({ text, className = "" }: SplitFlipTextProps) {
  if (!text) return null;

  const words = text.split(" ");

  return (
    <span className={`split-flip-text ${className}`}>
      {words.map((word, wordIdx) => {
        // Handle consecutive spaces or blank segments
        if (word === "") {
          return <span key={wordIdx} className="split-flip-space">&nbsp;</span>;
        }

        const chars = Array.from(word);

        return (
          <React.Fragment key={wordIdx}>
            <span className="split-flip-word">
              {/* Original Layer */}
              <span className="split-flip-before">
                {chars.map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="split-flip-char"
                    style={{ transitionDelay: `${charIdx * 15}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>

              {/* Duplicate Overlapping Layer */}
              <span className="split-flip-after" aria-hidden="true">
                {chars.map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="split-flip-char"
                    style={{ transitionDelay: `${charIdx * 15}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
            {/* Render trailing space for all but the last word */}
            {wordIdx < words.length - 1 && (
              <span className="split-flip-space">&nbsp;</span>
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
}
