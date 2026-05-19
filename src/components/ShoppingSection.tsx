"use client";

import VideoSection from "./VideoSection";

/**
 * ShoppingSection — Section 4: Shopping, Dining & Retails
 *
 * Mux playback_id: ItPEHwo7mF00lBAXoWsAROjpwb4XEAhxiV4Ayx3KdHfM
 * Pauses when BentoShowcase (#bento-section-container) or
 * EventSection (#event-section-container) scrolls into view.
 */
export default function ShoppingSection() {
  return (
    <VideoSection
      playbackId="ItPEHwo7mF00lBAXoWsAROjpwb4XEAhxiV4Ayx3KdHfM"
      metadata={{
        video_id: "shopping-moa",
        video_title: "ShoppingMOA",
      }}
      knockoutText="SHOPPING, DINING & RETAILS"
      knockoutFontSize="4.5vw"
      coveringSectionIds={["bento-section-container", "event-section-container"]}
      sectionId="shopping-section"
    />
  );
}
