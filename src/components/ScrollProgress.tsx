"use client";

import { useEffect, useState, useRef } from "react";

/**
 * ScrollProgress Component
 * 
 * Implements a premium, sleek, silver-toned vertical scroll indicator bar 
 * positioned fixed along the right side of the window viewport.
 * 
 * Key behaviors:
 * 1. Progress Calculation: Calculates the exact scroll percentage based on viewport offset vs scroll height.
 * 2. Responsive Visibility: Dynamically hides itself on the Hero/Landing section, fading in with a smooth opacity
 *    transition only once the user scrolls past 60% of the Hero's height.
 * 3. High Performance: Uses RequestAnimationFrame (RAF) to throttle scroll calculations, ensuring buttery-smooth
 *    rendering without layout thrashing.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const heroEl = () =>
      document.querySelector(".hero-section") as HTMLElement | null;

    function update() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const pct =
        scrollHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
          : 0;
      setProgress(pct);

      // Hide while hero is still the main viewport (sticky hero). If hero exists, hide until user scrolls past 60% of hero height
      const h = heroEl();
      if (h) {
        setVisible(scrollTop > h.clientHeight * 0.6);
      } else {
        setVisible(scrollTop > 40); // small fallback
      }
    }

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`scroll-progress-outer ${visible ? "visible" : "hidden"}`}
    >
      <div className="scroll-progress-track">
        <div
          className="scroll-progress-fill"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  );
}
