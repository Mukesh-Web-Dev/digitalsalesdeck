"use client";

import VideoSection from "./VideoSection";

/**
 * HospitalitySection — Section 15: Hospitality & Services
 *
 * Mux playback_id: UELhI1nccwGpb4VUsVf00000001R7kr4mTN9yDBVw20116Hw
 * The covering section ID ("hospitality-bento-container") is intentionally set but
 * currently has no showcase — the ContactFooter follows directly.
 * This keeps the observer pattern consistent for future expansion.
 */
export default function HospitalitySection() {
  return (
    <VideoSection
      playbackId="UELhI1nccwGpb4VUsVf00000001R7kr4mTN9yDBVw20116Hw"
      metadata={{
        video_id: "hospitality-moa",
        video_title: "HospitalityMOA",
      }}
      knockoutText="HOSPITALITY & SERVICES"
      knockoutFontSize="4.5vw"
      coveringSectionIds={["contact-us-container"]}
      sectionId="hospitality-section"
    />
  );
}
