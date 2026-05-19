"use client";

import VideoSection from "./VideoSection";

/**
 * EntertainmentSection — Section 8: Entertainment
 *
 * Mux playback_id: ydGUwcSHYxA3MHMhI01WDy5XLAVOUnLih6efCJ4yq41Q
 * Pauses when EntertainmentShowcase (#entertainment-bento-container) scrolls into view.
 */
export default function EntertainmentSection() {
  return (
    <VideoSection
      playbackId="ydGUwcSHYxA3MHMhI01WDy5XLAVOUnLih6efCJ4yq41Q"
      metadata={{
        video_id: "entertainment-moa",
        video_title: "EntertainmentMOA",
      }}
      knockoutText="ENTERTAINMENT"
      knockoutFontSize="4.5vw"
      coveringSectionIds={["entertainment-bento-container"]}
      sectionId="entertainment-section"
    />
  );
}
