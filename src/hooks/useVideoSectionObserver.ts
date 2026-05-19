"use client";

import { useEffect, useRef } from "react";

/**
 * useVideoSectionObserver
 *
 * Reusable hook for all video sections. Handles auto play/pause lifecycle:
 *   - Plays video when its own container enters the viewport (≥10% visible)
 *   - Pauses video when its own container leaves the viewport
 *   - Pauses video when ANY covering section (e.g. the next section) enters viewport
 *   - Resumes video when covering sections leave, if own section is still visible
 *
 * Usage:
 *   const containerRef = useVideoSectionObserver(playerRef, ["#next-section-id"]);
 *   <section ref={containerRef} ...>
 *
 * @param playerRef       - ref to the MuxPlayer / video element
 * @param coveringSectionIds - array of IDs of sections that scroll over this one
 * @param isPausedByUser  - optional ref that blocks auto-play if user paused manually
 */
import type MuxPlayerElement from "@mux/mux-player";

export function useVideoSectionObserver(
  playerRef: React.RefObject<MuxPlayerElement | null>,
  coveringSectionIds: string[],
  isPausedByUser?: React.RefObject<boolean>
) {
  const containerRef = useRef<HTMLElement | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = playerRef.current;
    if (!container || !video) return;

    /** Helper: check if any covering section is currently in the viewport */
    function isAnyCoveringVisible() {
      return coveringSectionIds.some((id) => {
        const el = document.getElementById(id.replace("#", ""));
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
    }

    /** Safe play — respects user pause and covering sections */
    function tryPlay() {
      if (isPausedByUser?.current) return;
      if (isAnyCoveringVisible()) return;
      video?.play?.().catch(() => {});
    }

    // --- Observer 1: Own container visibility ---
    const selfObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          tryPlay();
        } else {
          isVisibleRef.current = false;
          video?.pause?.();
        }
      },
      { threshold: 0.1 }
    );

    // --- Observer 2: Each covering section ---
    const coveringObservers: IntersectionObserver[] = coveringSectionIds.map(
      (id) => {
        const el = document.getElementById(id.replace("#", ""));
        const o = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              // Covering section entered → pause this video
              video?.pause?.();
            } else {
              // Covering section left → resume if own section is still visible
              if (isVisibleRef.current) tryPlay();
            }
          },
          { threshold: 0.1 }
        );
        if (el) o.observe(el);
        return o;
      }
    );

    selfObserver.observe(container);

    return () => {
      selfObserver.disconnect();
      coveringObservers.forEach((o) => o.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}
