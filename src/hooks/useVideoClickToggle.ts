import { useRef, useCallback } from "react";
import type MuxPlayerElement from "@mux/mux-player";

/**
 * useVideoClickToggle
 *
 * Simple click-to-pause/play toggle for any MuxPlayer section.
 * - Click → pause (if playing) or play (if paused)
 * - Tracks isPausedByUser so IntersectionObserver doesn't
 *   auto-resume when section re-enters viewport after a manual pause.
 *
 * Usage:
 *   const { handleClick, isPausedByUser } = useVideoClickToggle(playerRef);
 *   <div style={{ cursor: "pointer" }} onClick={handleClick}> ... </div>
 */
export function useVideoClickToggle(
  playerRef: React.RefObject<MuxPlayerElement | null>
) {
  const isPausedByUser = useRef(false);

  const handleClick = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (player.paused) {
      player.play?.().catch(() => {});
      isPausedByUser.current = false;
    } else {
      player.pause?.();
      isPausedByUser.current = true;
    }
  }, [playerRef]);

  return { handleClick, isPausedByUser };
}
