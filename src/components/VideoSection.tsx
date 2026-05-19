"use client";

import { useRef, useState } from "react";
import type MuxPlayerElement from "@mux/mux-player";
import MuxPlayer from "@mux/mux-player-react";
import { useGlobalAudio } from "../app/GlobalAudioContext";
import PlayerControls from "./PlayerControls";
import TextKnockout from "./TextKnockout";
import { useVideoSectionObserver } from "../hooks/useVideoSectionObserver";
import { useVideoClickToggle } from "../hooks/useVideoClickToggle";

interface VideoSectionProps {
  /** Mux playback ID for the video asset */
  playbackId: string;
  /** Mux asset metadata for analytics */
  metadata: {
    video_id: string;
    video_title: string;
  };
  /** Text displayed in the cinematic knockout overlay after first loop */
  knockoutText: string;
  /** Font size for the knockout text. Defaults to "4.5vw" */
  knockoutFontSize?: string;
  /** IDs of sections that will scroll over this one (triggers pause) */
  coveringSectionIds: string[];
  /** HTML id applied to the root <section> element */
  sectionId: string;
  /** Enable click-to-pause/play toggle (used on EventSection). Defaults to false */
  enableClickToggle?: boolean;
}

/**
 * VideoSection Component
 *
 * Shared template for all full-screen video sections (Sections 4, 6, 8, 10, 12, 15).
 * Handles:
 *   - MuxPlayer HLS streaming with global mute sync
 *   - IntersectionObserver auto play/pause via useVideoSectionObserver
 *   - Optional click-to-toggle via useVideoClickToggle
 *   - Cinematic TextKnockout overlay after first video loop
 *   - PlayerControls (mute/fullscreen) overlay
 *
 * Used by: ShoppingSection, EventSection, EntertainmentSection,
 *           VenueSpacesSection, PromotionSection, HospitalitySection
 */
export default function VideoSection({
  playbackId,
  metadata,
  knockoutText,
  knockoutFontSize = "4.5vw",
  coveringSectionIds,
  sectionId,
  enableClickToggle = false,
}: VideoSectionProps) {
  const { isMuted } = useGlobalAudio();
  const playerRef = useRef<MuxPlayerElement | null>(null);

  const [showKnockout, setShowKnockout] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Optional click-to-pause — only used when enableClickToggle is true
  const { handleClick, isPausedByUser } = useVideoClickToggle(playerRef);

  // Auto play/pause based on section visibility and covering sections
  const containerRef = useVideoSectionObserver(
    playerRef,
    coveringSectionIds,
    enableClickToggle ? isPausedByUser : undefined
  );

  return (
    <section
      ref={containerRef}
      id={sectionId}
      className="relative w-full h-[100dvh] bg-black overflow-hidden"
    >
      {/* Full-screen MuxPlayer */}
      <div className="mux-player absolute inset-0 w-full h-full">
        <MuxPlayer
          ref={playerRef}
          playbackId={playbackId}
          autoPlay={false}
          muted={isMuted}
          loop
          preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          metadata={{
            video_id: metadata.video_id,
            video_title: metadata.video_title,
            viewer_user_id: "user-id-007",
          }}
          onTimeUpdate={(e) => {
            const video = e.target as MuxPlayerElement;
            // Trigger knockout at ~0.4s before loop to sync with transition
            if (
              video.duration &&
              video.currentTime > video.duration - 0.4 &&
              !hasPlayedOnce
            ) {
              setHasPlayedOnce(true);
              setShowKnockout(true);
            }
          }}
        />
      </div>

      {/* Click overlay for play/pause toggle (only when enableClickToggle is true) */}
      {enableClickToggle && (
        <div
          onClick={handleClick}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            cursor: "pointer",
          }}
        />
      )}

      {/* Volume and fullscreen controls */}
      <PlayerControls />

      {/* Cinematic Out-To-In text knockout effect */}
      <TextKnockout
        show={showKnockout}
        text={knockoutText}
        fontSize={knockoutFontSize}
      />
    </section>
  );
}
