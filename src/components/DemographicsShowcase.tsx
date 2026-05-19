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

/** Trade area and visitor map images */
const IMAGES = [
  "https://ik.imagekit.io/bug8bug88/Demographics/USA%20Visitor%20Map_cropped.jpg",
  "https://ik.imagekit.io/bug8bug88/Demographics/minneapolis-skyline-wall-mural.jpg",
  "https://ik.imagekit.io/bug8bug88/Demographics/TradeAreaMap.jpg",
  "https://ik.imagekit.io/bug8bug88/Demographics/Airplane.jpg",
  "https://ik.imagekit.io/bug8bug88/Demographics/IntlMap_Leasing.jpg",
];

/**
 * DemographicsShowcase Component
 *
 * Section 15: Demographics data showcase.
 * Side-by-side split layout: left column is a full-height AutoSlideshow;
 * right column has two stacked halves with trade area stats and FadeRevealText.
 * GSAP scale + border-radius entrance mirrors the BentoShowcase pattern.
 */
export default function DemographicsShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Scale + border-radius entrance: scrubbed to scroll progress
      gsap.fromTo(
        wrapperRef.current,
        { borderRadius: "60px", scale: 0.9 },
        {
          borderRadius: "0px",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
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
      className="demographics-showcase-container"
      id="demographics-showcase"
    >
      <div className="demographics-showcase-wrapper" ref={wrapperRef}>
        {/* Left Column: Map & image slideshow */}
        <div className="showcase-left">
          <AutoSlideshow
            initialImages={IMAGES}
            delay={4000}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Column: Typography & data */}
        <div className="showcase-right">
          {/* Top Half: Light theme — brand header */}
          <div className="showcase-top-half">
            <FadeRevealText delay={0}>
              <h2 className="showcase-heading-dark">
                <SplitFlipText text="Welcome to Mall of America" /><span className="superscript">®</span>
              </h2>
            </FadeRevealText>
            <FadeRevealText delay={0.1}>
              <p className="showcase-subtext-dark">
                <SplitFlipText text="The 18+ US State Trade Area" />
              </p>
              <p className="showcase-subtext-dark">
                <SplitFlipText text="Key International and Emerging Markets" />
              </p>
            </FadeRevealText>
          </div>

          {/* Bottom Half: Dark theme — market statistics */}
          <div className="showcase-bottom-half">
            <FadeRevealText delay={0.2}>
              <h3 className="showcase-heading-light"><SplitFlipText text="Local Demographics" /></h3>
            </FadeRevealText>
            <FadeRevealText delay={0.3}>
              <p className="showcase-subheading-light">
                <SplitFlipText text="Minneapolis/St. Paul Market DMA" />
              </p>
              <p className="showcase-subheading-light">
                <SplitFlipText text="Total Population " /><AnimatedNumber value={3551036} />
              </p>
            </FadeRevealText>

            <ul className="showcase-list">
              <li>
                <FadeRevealText delay={0.4}>
                  <SplitFlipText text="• DAY TRIP MARKET (50-100 MILES) Total Population " /><AnimatedNumber value={450978} />
                </FadeRevealText>
              </li>
              <li>
                <FadeRevealText delay={0.5}>
                  <SplitFlipText text="• Fly Market (500+ Miles) Total Population " /><AnimatedNumber value={99105870} />
                </FadeRevealText>
              </li>
              <li>
                <FadeRevealText delay={0.6}>
                  <SplitFlipText text="• Nearly " /><AnimatedNumber value={10} suffix="%" /><SplitFlipText text=" of visitors are from outside the United States" />
                </FadeRevealText>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
