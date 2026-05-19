"use client";

import VideoSection from "./VideoSection";

/**
 * VenueSpacesSection — Section 10: Private Venue Spaces
 *
 * Mux playback_id: p02p00NhdeOVRPkDM5P95Z48VmzH012MSQvQ6bnzRGjPHA
 * Pauses when VenueSpacesShowcase (#private-venues-bento-container) scrolls into view.
 */
export default function VenueSpacesSection() {
  return (
    <VideoSection
      playbackId="p02p00NhdeOVRPkDM5P95Z48VmzH012MSQvQ6bnzRGjPHA"
      metadata={{
        video_id: "venues-moa",
        video_title: "VenuesMOA",
      }}
      knockoutText="PRIVATE VENUES SPACES"
      knockoutFontSize="4.5vw"
      coveringSectionIds={["private-venues-bento-container"]}
      sectionId="private-venues-section"
    />
  );
}
