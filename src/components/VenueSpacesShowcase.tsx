"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeRevealText from "./FadeRevealText";
import AutoSlideshow from "./AutoSlideshow";
import AnimatedNumber from "./AnimatedNumber";
import SplitFlipText from "./SplitFlipText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Venue space images — right column tall slideshow */
const IMAGES_1 = [
  "https://ik.imagekit.io/bug8bug88/venues/Mezzanine.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/MOA19_BCamD4-221.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/MOA19_BCamD4-096.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/MOA19_BCamD4-113.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/MOA19_BCamD4-075.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/MOA19_BCamD4-089.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/IMG_0347.jpeg",
  "https://ik.imagekit.io/bug8bug88/venues/Studio%20C.jpg",
];

/** Venue lounge & stage images — bottom-left slideshow */
const IMAGES_2 = [
  "https://ik.imagekit.io/bug8bug88/venues/IMG_0307.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/20250620_111636.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/IMG_0910.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/MOA19_BCamD4-085.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/IMG_1556.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/The%20Lounge%20@%20MOA%201.jpeg",
  "https://ik.imagekit.io/bug8bug88/venues/Main%20Stage.jpg",
  "https://ik.imagekit.io/bug8bug88/venues/Studio%20F.jpg",
];

/**
 * VenueSpacesShowcase Component
 *
 * Section 11: Private Venue Spaces data showcase.
 * CSS Grid bento layout highlighting square footage and event facilities.
 * Uses shared AutoSlideshow for both image columns.
 */
export default function VenueSpacesShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        wrapperRef.current,
        { borderRadius: "60px", scale: 0.9 },
        {
          borderRadius: "0px",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full z-[15] bg-transparent"
      id="venue-showcase"
    >
      <div
        ref={wrapperRef}
        className="w-full h-auto md:h-[100dvh] md:max-h-[100dvh] bg-white overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.2)] flex flex-col md:grid md:grid-cols-3 md:grid-rows-2"
        style={{ transformOrigin: "bottom center" }}
      >
        {/* Block 1: Top Left — Private event space sq footage (Tan) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 text-white bg-[#B5855A] col-start-1 row-start-1 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.3}>
            <p className="text-md uppercase tracking-widest text-white/80 mb-2"><SplitFlipText text="Over" /></p>
            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <AnimatedNumber value={4000} /><SplitFlipText text=" sq ft" />
            </h2>
            <p className="text-lg md:text-xl font-medium uppercase tracking-wide">
              <SplitFlipText text="of private event space" />
            </p>
          </FadeRevealText>
        </div>

        {/* Block 2: Bottom Left — Venue slideshow */}
        <div className="col-start-1 row-start-2 h-[50dvh] md:h-full relative overflow-hidden">
          <AutoSlideshow initialImages={IMAGES_2} delay={3500} />
        </div>

        {/* Block 3: Top Middle — Executive Center (Light Beige) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-[#F4F1ED] text-neutral-800 col-start-2 row-start-1 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.1}>
            <ul className="space-y-4 md:space-y-6 text-[1rem] md:text-lg lg:text-xl font-light tracking-wide">
              <li>
                <span className="font-semibold"><SplitFlipText text="MALL OF AMERICA®" /></span><SplitFlipText text=" has a " /><AnimatedNumber value={2834} /><SplitFlipText text=" sq ft Executive Center facility with three meeting spaces" />
              </li>
            </ul>
          </FadeRevealText>
        </div>

        {/* Block 4: Bottom Middle — The Overlook (Blue) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-[#6E7BBD] text-white col-start-2 row-start-2 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.2}>
            <p className="text-sm md:text-md uppercase tracking-[0.2em] mb-2">
              <SplitFlipText text="The Overlook at MOA has over " /><AnimatedNumber value={17000} /><SplitFlipText text=" sq ft of space for groups of " /><AnimatedNumber value={300} suffix="+" />
            </p>
          </FadeRevealText>
        </div>

        {/* Block 5: Right — Venue slideshow (full height) */}
        <div className="col-start-3 row-span-2 h-[100dvh] md:h-full relative overflow-hidden">
          <AutoSlideshow initialImages={IMAGES_1} delay={4200} />
        </div>
      </div>
    </section>
  );
}
