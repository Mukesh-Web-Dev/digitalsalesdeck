"use client";

import { useEffect, useState, useRef } from "react";

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
