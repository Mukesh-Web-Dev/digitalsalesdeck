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

/** Shopping retail/dining images — right column tall slideshow */
const IMAGES_1 = [
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-18%20000240%20(1).png",
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-18%20000137%20(1).png",
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-18%20000106%20(1).png",
  "https://ik.imagekit.io/bug8bug88/enhance_n2og6pvb4k8wi22p0by7.png",
  "https://ik.imagekit.io/bug8bug88/enhance_iq2j6ixxddmjwt3pp7q8.png",
];

/** Dining & food images — bottom-left slideshow */
const IMAGES_2 = [
  "https://ik.imagekit.io/bug8bug88/Gemini_Generated_Image_vlob0ivlob0ivlob.png",
  "https://ik.imagekit.io/bug8bug88/Gemini_Generated_Image_fs8m1rfs8m1rfs8m.png",
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-17%20235951%20(1).png",
  "https://ik.imagekit.io/bug8bug88/enhance_0mqd53c5hfy1vkz1a5li.png",
  "https://ik.imagekit.io/bug8bug88/enhance_r4dydpznk10hfn52b77e.png",
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-17%20235719.png?updatedAt=1779043430672",
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-17%20235743.png?updatedAt=1779043429164",
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-17%20235803.png?updatedAt=1779043429101",
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-17%20235822.png?updatedAt=1779043417726",
  "https://ik.imagekit.io/bug8bug88/Screenshot%202026-05-17%20235836.png?updatedAt=1779043409893",
  "https://ik.imagekit.io/bug8bug88/happy_hours_specials.jpg?updatedAt=1779042976185",
];

/**
 * BentoShowcase Component
 *
 * Section 5: Shopping, Dining & Retails data showcase.
 * CSS Grid bento layout with two AutoSlideshow instances and FadeRevealText stats.
 * GSAP scale + border-radius entrance animation mirrors the Section 3 pattern.
 */
export default function BentoShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scale + border-radius entrance: slides in from bottom, expanding to full screen
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full z-[15] bg-transparent" id="bento-showcase">
      <div
        ref={wrapperRef}
        className="w-full h-auto md:h-[100dvh] md:max-h-[100dvh] bg-white overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.2)] flex flex-col md:grid md:grid-cols-3 md:grid-rows-2"
        style={{ transformOrigin: "bottom center" }}
      >
        {/* Block 1: Top Left — Retail stats (Tan) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 text-white bg-[#B5855A] col-start-1 row-start-1 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.1}>
            <ul className="space-y-4 md:space-y-2 text-[1rem] md:text-lg lg:text-xl font-light tracking-wide">
              <li><span className="font-semibold"><AnimatedNumber value={5.6} isDecimal={true} decimalPlaces={1} suffix="M+" /><SplitFlipText text=" sq feet" /></span><SplitFlipText text=" of retail and entertainment" /></li>
              <li><span className="font-semibold"><AnimatedNumber value={500} suffix="+" /><SplitFlipText text=" stores" /></span></li>
              <li><SplitFlipText text="Over " /><span className="font-semibold"><AnimatedNumber value={46} suffix="M" /><SplitFlipText text=" shoppers" /></span><SplitFlipText text=" live within a days drive" /></li>
              <li><span className="font-semibold"><AnimatedNumber value={1} prefix="$" suffix="M+" /><SplitFlipText text=" Average HHI" /></span><SplitFlipText text=" in 35-mile radius" /></li>
            </ul>
          </FadeRevealText>
        </div>

        {/* Block 2: Bottom Left — Dining slideshow */}
        <div className="col-start-1 row-start-2 h-[50dvh] md:h-full relative overflow-hidden">
          <AutoSlideshow initialImages={IMAGES_2} delay={3500} />
        </div>

        {/* Block 3: Top Middle — F&B revenue (Light Beige) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-[#F4F1ED] text-neutral-800 col-start-2 row-start-1 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.2}>
            <p className="text-sm md:text-md uppercase tracking-[0.2em] text-neutral-500 mb-2"><SplitFlipText text="OVER" /></p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <AnimatedNumber value={134} prefix="$" suffix="M" />
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-medium tracking-wide uppercase">
              <SplitFlipText text="Annual Food and Beverage Sales" />
            </p>
            <p className="text-md md:text-lg text-neutral-600 font-light">
              <SplitFlipText text="over " /><AnimatedNumber value={30} suffix="+" /><SplitFlipText text=" places to eat" />
            </p>
          </FadeRevealText>
        </div>

        {/* Block 4: Bottom Middle — Leasing stats (Blue) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-[#6E7BBD] text-white col-start-2 row-start-2 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.3}>
            <p className="text-md uppercase tracking-widest text-white/80 mb-2"><SplitFlipText text="Nearly" /></p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <AnimatedNumber value={300000} />
            </h2>
            <p className="text-lg md:text-xl font-medium uppercase tracking-wide">
              <SplitFlipText text="Square feet leased" />
            </p>
            <div className="w-12 h-px bg-white/40 my-4"></div>
            <ul className="space-y-3 text-[1rem] md:text-lg font-light">
              <li><SplitFlipText text="Over " /><span className="font-semibold"><AnimatedNumber value={45} /><SplitFlipText text=" new leases" /></span><SplitFlipText text=" signed" /></li>
              <li><span className="font-semibold"><AnimatedNumber value={33} /><SplitFlipText text=" first to market concepts" /></span></li>
            </ul>
          </FadeRevealText>
        </div>

        {/* Block 5: Right — Retail slideshow (full height) */}
        <div className="col-start-3 row-span-2 h-[100dvh] md:h-full relative overflow-hidden">
          <AutoSlideshow initialImages={IMAGES_1} delay={4200} />
        </div>
      </div>
    </section>
  );
}
