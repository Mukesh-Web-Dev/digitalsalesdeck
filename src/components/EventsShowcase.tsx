"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FadeRevealText from "./FadeRevealText";
import AutoSlideshow from "./AutoSlideshow";
import AnimatedNumber from "./AnimatedNumber";
import SplitFlipText from "./SplitFlipText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Event photography and space images */
const IMAGES = [
  "https://ik.imagekit.io/bug8bug88/Events/Clouds_Choir_2017_Madison-3066.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/artium.webp",
  "https://ik.imagekit.io/bug8bug88/Events/20230812_203803182_iOS.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/F1rst_Wrestling_Rumble_Rotunda_BUMP_OPERA_2022-08301.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/MB_Minneapolis2019-05-09_003.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/Wahlburgers_180531_TN-155.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/20230930_190008068_iOS.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/20230615_182459559_iOS.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/KateHudsonTN015.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/20230428_235532770_iOS.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/20230623_172000205_iOS.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/IMG_4244~photo-full.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/Birthday-Parties_Event.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/Event%20Spaces%20Map_all%20spaces_012022.png",
  "https://ik.imagekit.io/bug8bug88/Events/Event.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/Event_mellodeath.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/Tex%20Mex2.jpg",
  "https://ik.imagekit.io/bug8bug88/Events/MMC4.jpg",
];

/**
 * EventsShowcase Component
 *
 * Section 7: Event Organizing & Hosting data showcase.
 * Side-by-side split layout: left column AutoSlideshow, right column event stats.
 * GSAP scale + border-radius entrance mirrors the BrandShowcase pattern.
 */
export default function EventsShowcase() {
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
    <section ref={containerRef} className="brand-showcase-container" id="event-showcase">
      <div className="brand-showcase-wrapper" ref={wrapperRef}>

        {/* Left Column: Event image slideshow */}
        <div className="showcase-left">
          <AutoSlideshow
            initialImages={IMAGES}
            delay={4000}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Column: Typography & Data */}
        <div className="showcase-right">

          {/* Top Half: Light theme — headline stat */}
          <div className="showcase-top-half">
            <FadeRevealText delay={0}>
              <h2 className="showcase-heading-dark">
                <SplitFlipText text="Hosts over " /><AnimatedNumber value={370} suffix="+" /><SplitFlipText text=" events annually" />
              </h2>
            </FadeRevealText>
          </div>

          {/* Bottom Half: Dark theme — venue details */}
          <div className="showcase-bottom-half">
            <FadeRevealText delay={0.2}>
              <h3 className="showcase-heading-light">
                <SplitFlipText text="With " /><AnimatedNumber value={10} /><SplitFlipText text=" high traffic event spaces area" />
              </h3>
            </FadeRevealText>
            <FadeRevealText delay={0.3}>
              <p className="showcase-subheading-light">
                <SplitFlipText text="Including the " /><AnimatedNumber value={5000} /><SplitFlipText text=" sq foot Huntington Bank Rotunda" />
              </p>
            </FadeRevealText>
          </div>

        </div>
      </div>
    </section>
  );
}
