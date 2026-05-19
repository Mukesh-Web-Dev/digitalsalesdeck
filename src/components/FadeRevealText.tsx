"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface FadeRevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * FadeRevealText Component
 * 
 * Uses a manual IntersectionObserver instead of GSAP ScrollTrigger to avoid
 * premature triggers in sticky-positioned section layouts. The observer waits
 * until the element is truly painted on screen (90% visible) before firing
 * a slow, cinematic slide-up animation.
 */
export default function FadeRevealText({ 
  children, 
  className = "", 
  delay = 0.6,
  duration = 3.0
}: FadeRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasTriggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
            observer.disconnect();

            const el = container.querySelector('.fade-el');
            if (el) {
              gsap.fromTo(
                el,
                { y: "110%", opacity: 0 },
                {
                  y: "0%",
                  opacity: 1,
                  duration: duration,
                  delay: delay,
                  ease: "power3.out",
                }
              );
            }
          }
        });
      },
      { threshold: 0.9 } // Only fire when 90% of the element is actually visible on screen
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [hasTriggered, delay, duration]);

  return (
    <div ref={containerRef} className={`fade-overflow ${className}`}>
      <span className="fade-el" style={{ display: "block", opacity: 0 }}>
        {children}
      </span>
    </div>
  );
}
