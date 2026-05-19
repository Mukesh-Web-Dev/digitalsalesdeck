"use client";

import { useState, useEffect } from "react";
import { useGlobalAudio } from "../app/GlobalAudioContext";

/**
 * PlayerControls Component
 *
 * Manages the global volume and fullscreen toggle for the video experience.
 * Follows minimal chrome design principles (bottom left/right placement)
 * as specified in AGENTS.md.
 */
export default function PlayerControls() {
  const { isMuted, setIsMuted } = useGlobalAudio();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync state with native browser fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  /**
   * Toggles the document into and out of fullscreen mode.
   * Maintains relative scroll position so `dvh` resizes don't displace the view,
   * and refreshes GSAP ScrollTrigger to ensure animations stay perfectly synced.
   */
  const toggleFullscreen = () => {
    // Calculate current scroll percentage to prevent displacement when viewport height changes
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent =
      scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

    const applyScrollFix = () => {
      setTimeout(() => {
        const newScrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: scrollPercent * newScrollableHeight,
          behavior: "instant",
        });
        // Refresh GSAP triggers to match the new viewport dimensions
        const win = window as unknown as {
          ScrollTrigger?: { refresh: () => void };
        };
        win.ScrollTrigger?.refresh();
      }, 100); // Wait for browser UI to settle
    };

    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(applyScrollFix)
        .catch((err) => console.log(err));
    } else {
      document
        .exitFullscreen()
        .then(applyScrollFix)
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="player-controls">
      <div>
        <button
          className="player-button"
          onClick={() => setIsMuted(!isMuted)}
          style={{
            height: "18px",
            width: "18px",
            background: "none",
            border: "none",
            padding: 0,
          }}
          aria-label={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 80 80"
                className="lv-icon"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  fill="#ffffffff"
                  d="M29.695 14v52L11 50H0V30h11zm43.622 5 5.79 5.067L65.165 40l13.942 15.933L73.317 61 60.053 45.842 46.791 61 41 55.933 54.941 40 41 24.067 46.79 19l13.263 15.158z"
                ></path>
              </svg>
            </span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 80 80"
              className="lv-icon"
              focusable="false"
              aria-hidden="true"
            >
              <path
                fill="#ffffffff"
                d="M63.83 2c20.893 20.893 20.893 54.767 0 75.66l-4.95-4.95c18.16-18.159 18.16-47.6 0-65.76zM53.224 12.607c15.035 15.035 15.035 39.412 0 54.447l-4.95-4.95c12.301-12.301 12.301-32.246 0-44.548l4.95-4.95zM29.695 14v52L11 50H0V30h11zm12.922 9.213c9.177 9.178 9.177 24.057 0 33.234l-4.95-4.95c6.444-6.443 6.444-16.89 0-23.334z"
              ></path>
            </svg>
          )}
        </button>
      </div>
      <div>
        <button
          className="player-button"
          onClick={toggleFullscreen}
          style={{
            height: "18px",
            width: "18px",
            background: "none",
            border: "none",
            padding: 0,
          }}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {!isFullscreen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#FFFFFF"
            >
              <path d="M144-144v-192h72v120h120v72H144Zm480 0v-72h120v-120h72v192H624ZM144-624v-192h192v72H216v120h-72Zm600 0v-120H624v-72h192v192h-72Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#FFFFFF"
            >
              <path d="M264-144v-120H144v-72h192v192h-72Zm360 0v-192h192v72H696v120h-72ZM144-624v-72h120v-120h72v192H144Zm480 0v-192h72v120h120v72H624Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
