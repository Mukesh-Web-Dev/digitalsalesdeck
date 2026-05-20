"use client";

import { useState, useRef, useEffect } from "react";
import type MuxPlayerElement from "@mux/mux-player";
import MuxPlayer from "@mux/mux-player-react";
import { useGlobalAudio } from "../app/GlobalAudioContext";

interface HeroVideoProps {
  playerRef: React.RefObject<MuxPlayerElement | null>;
  onFirstLoopComplete: () => void;
  onReady?: () => void;
}

/**
 * HeroVideo Component
 *
 * Handles the MuxPlayer instance for the main hero section.
 * Manages background buffering, global audio syncing, and detects
 * when the first loop completes to trigger the text knockout effect.
 * Fires `onReady` when the browser has buffered enough data for
 * smooth playback (canPlay event), so the Loader can gate the START button.
 * Follows HLS and lazy loading performance guidelines.
 */
export default function HeroVideo({
  playerRef,
  onFirstLoopComplete,
  onReady,
}: HeroVideoProps) {
  const { isMuted } = useGlobalAudio();
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const readyFired = useRef(false);

  // React to global active-video events so only the active video plays
  useEffect(() => {
    const onGlobalActivate = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      const activeId = detail.id;
      const vid = playerRef.current;
      if (!vid) return;
      if (activeId === "hero") {
        vid.play?.().catch(() => {});
      } else {
        vid.pause?.();
      }
    };
    window.addEventListener(
      "video-activate",
      onGlobalActivate as EventListener
    );
    return () =>
      window.removeEventListener(
        "video-activate",
        onGlobalActivate as EventListener
      );
  }, [playerRef]);

  return (
    <>
      <MuxPlayer
        ref={playerRef}
        className="mux-player"
        autoPlay={false} // Prevents immediate autoplay, waiting for Loader
        preload="metadata" // Changed from auto to reduce enormous network payload
        muted={isMuted}
        loop
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          position: "absolute",
          inset: 0,
          background: "transparent",
        }}
        onCanPlay={() => {
          // Fires when browser estimates it can play through without buffering stops.
          // Gate with ref to fire callback only once.
          if (!readyFired.current && onReady) {
            readyFired.current = true;
            onReady();
          }
        }}
        onTimeUpdate={(e) => {
          const video = e.target as MuxPlayerElement;
          // timeupdate only fires every ~250ms in most browsers.
          // Checking for exactly 0.1s can be completely skipped if the time jumps from e.g. duration-0.2s to 0.0s (loop).
          // 0.4s is a safe buffer to ensure the animation triggers right before the loop seamlessly.
          if (
            video.duration &&
            video.currentTime > video.duration - 0.4 &&
            !hasPlayedOnce
          ) {
            setHasPlayedOnce(true);
            onFirstLoopComplete();
          }
        }}
        fullscreenElement="true"
        playbackId="01FdU8MUK01L027RJuoA7pZoOsZ54Y01C9X4Hu1kEKTzl8M"
        poster="https://image.mux.com/01FdU8MUK01L027RJuoA7pZoOsZ54Y01C9X4Hu1kEKTzl8M/thumbnail.webp?width=1280"
        metadata={{
          video_id: "qm8G9xRo02lMiYHZ4Bjk2D00p9YqjWbk01s55AHA3u8A7U",
          video_title: "Intro-MOA",
          viewer_user_id: "user-id-007",
        }}
      />
    </>
  );
}
