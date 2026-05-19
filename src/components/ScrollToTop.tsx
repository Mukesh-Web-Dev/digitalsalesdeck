"use client";

import { useEffect, useState, useRef } from "react";

/**
 * ScrollToTop Component
 * 
 * Displays a premium, animated "TOP" button at the bottom-right corner.
 * Only visible once the user scrolls past the Hero section.
 * Smoothly scrolls the user back to the top of the page when clicked.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const heroEl = () =>
      document.getElementById("hero-section") as HTMLElement | null;

    function update() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const h = heroEl();
      
      if (h) {
        // Show after scrolling past 90% of the Hero section height
        setVisible(scrollTop > h.clientHeight * 0.9);
      } else {
        // Fallback to viewport height if hero is not found
        setVisible(scrollTop > window.innerHeight * 0.9);
      }
    }

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    // Initialize state
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`group fixed right-[49%] bottom-[2%] z-[99999] flex flex-col items-center justify-center cursor-pointer select-none gap-1 bg-none border-none p-0 transition-all duration-300 ease-in-out ${
        visible
          ? "opacity-60 translate-y-0 pointer-events-auto hover:opacity-100"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Floating upward-pointing chevron */}
      <div
        className="text-white transition-colors duration-300"
        style={{
          animation: "float-vertical 2s ease-in-out infinite",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M4 22 L16 10 L28 22"
          />
        </svg>
      </div>

      {/* Tiny luxury spaced text */}
      <span className="relative text-[0.55rem] font-light uppercase tracking-[0.35em] text-white antialiased transition-colors duration-300 after:absolute after:bottom-[-2px] after:left-[10%] after:w-[80%] after:h-[1px] after:bg-white after:scale-x-0 after:origin-center after:transition-transform after:duration-300 group-hover:after:scale-x-100">
        TOP
      </span>
    </button>
  );
}
