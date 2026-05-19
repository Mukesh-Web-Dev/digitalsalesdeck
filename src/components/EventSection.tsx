"use client";

import VideoSection from "./VideoSection";

/**
 * EventSection — Section 6: Event Organizing & Hosting
 *
 * Mux asset_id:    msYEBR5tLJujWiKOgSgT15LEj01r7XrJ02QiOFG65hj5Y
 * Mux playback_id: tDcos2keYFq3EVk00OJCv02nRYOrBnhcSt2alTm02Yjt2o
 * Title:           EventMOA1080pHERO
 *
 * Pauses when EventsShowcase (#event-showcase-container) scrolls into view.
 * enableClickToggle allows the user to manually pause/resume the video by clicking.
 */
export default function EventSection() {
  return (
    <VideoSection
      playbackId="tDcos2keYFq3EVk00OJCv02nRYOrBnhcSt2alTm02Yjt2o"
      metadata={{
        video_id: "msYEBR5tLJujWiKOgSgT15LEj01r7XrJ02QiOFG65hj5Y",
        video_title: "EventMOA1080pHERO",
      }}
      knockoutText="EVENT ORGANIZING & HOSTING"
      knockoutFontSize="4vw"
      coveringSectionIds={["event-showcase-container"]}
      sectionId="event-section"
      enableClickToggle
    />
  );
}
