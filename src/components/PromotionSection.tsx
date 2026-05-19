"use client";

import VideoSection from "./VideoSection";

/**
 * PromotionSection — Section 12: Promotion, Advisement & Naming Rights
 *
 * Mux playback_id: 1UzDU7OJdoF7Cq631KbFpk6bpE02n7b8qM4FN38np00pY
 * Pauses when PromotionShowcase (#promotion-bento-container) scrolls into view.
 */
export default function PromotionSection() {
  return (
    <VideoSection
      playbackId="1UzDU7OJdoF7Cq631KbFpk6bpE02n7b8qM4FN38np00pY"
      metadata={{
        video_id: "promotion-moa",
        video_title: "PromotionMOA",
      }}
      knockoutText="PROMOTION & ADVISEMENT"
      knockoutFontSize="4.5vw"
      coveringSectionIds={["promotion-bento-container"]}
      sectionId="promotion-section"
    />
  );
}
