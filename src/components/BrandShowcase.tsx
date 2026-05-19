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

const IMAGES = [
  "https://ik.imagekit.io/bug8bug88/leasing_development-future-expansion.jpg?updatedAt=1779034201879",
  "https://ik.imagekit.io/bug8bug88/MOA_Exterior.jpg?updatedAt=1779034170767",
  "https://ik.imagekit.io/bug8bug88/employment-hub-hero.jpg?updatedAt=1779034164547"
];

/**
 * BrandShowcase Component
 * 
 * Section 3: Displays a side-by-side luxury layout with advanced GSAP animations.
 */
export default function BrandShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useGSAP(() => {
    // Rounded Corners Expanding to Full Screen on Scroll
    gsap.fromTo(
      wrapperRef.current,
      {
        borderRadius: "60px",
        scale: 0.9,
      },
      {
        borderRadius: "0px",
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Starts when section enters bottom of screen
          end: "top top",      // Ends when section hits top of screen
          scrub: true,         // Links animation directly to scroll progress
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="brand-showcase-container" id="brand-showcase">
      <div className="brand-showcase-wrapper" ref={wrapperRef}>

        {/* Left Column: Image Slideshow */}
        <div className="showcase-left">
          <AutoSlideshow initialImages={IMAGES} delay={4000} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>

        {/* Right Column: Typography & Data */}
        <div className="showcase-right">

          {/* Top Half: Light Theme */}
          <div className="showcase-top-half">
            <FadeRevealText delay={0}>
              <h2 className="showcase-heading-dark">
                <SplitFlipText text="Welcome to Mall of America" /><span className="superscript">®</span>
              </h2>
            </FadeRevealText>
            <FadeRevealText delay={0.1}>
              <p className="showcase-subtext-dark">
                <SplitFlipText text="showcase your brand through an integrated marketing partnership that engages our over 32 million annual guests in a unique, safe and fun environment." />
              </p>
            </FadeRevealText>
          </div>

          {/* Bottom Half: Dark Theme */}
          <div className="showcase-bottom-half">
            <FadeRevealText delay={0.2}>
              <h3 className="showcase-heading-light">
                <SplitFlipText text="OVER " /><AnimatedNumber value={32} suffix="M+" /><SplitFlipText text=" ANNUAL VISITORS" />
              </h3>
            </FadeRevealText>
            <FadeRevealText delay={0.3}>
              <p className="showcase-subheading-light">
                <SplitFlipText text="OVER " /><AnimatedNumber value={1} prefix="$" suffix="B+" /><SplitFlipText text=" IN ANNUAL MALL SALES" />
              </p>
            </FadeRevealText>

            <ul className="showcase-list">
              <li>
                <FadeRevealText delay={0.4}>
                  <SplitFlipText text="• #1 Retail Center experience in America" />
                </FadeRevealText>
              </li>
              <li>
                <FadeRevealText delay={0.5}>
                  <SplitFlipText text="• #1 retail and entertainment destination in the country" />
                </FadeRevealText>
              </li>
              <li>
                <FadeRevealText delay={0.6}>
                  <SplitFlipText text="• #1 Shopping destination in the Minneapolis/St. Paul market" />
                </FadeRevealText>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
