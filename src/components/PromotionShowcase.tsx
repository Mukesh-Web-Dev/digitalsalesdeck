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

/** In-mall advertising/promotion images — right column tall slideshow */
const IMAGES_1 = [
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/20221014_231952219_iOS.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/IMG_0034.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/20181103_122851.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Ulta%20Court%20Banners_Macy's%20v2.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Lifewater%20wallscape%20(1).jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/1000014987.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/20170414_122849_resized.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/1000016876.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/20220610_133929.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/1000015152.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/MN%20Wild%20ad%20with%20full%20screen.jpg",
];

/** Digital display & exterior panel images — bottom-left slideshow */
const IMAGES_2 = [
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Exterior%20Panels_Winter%20v4.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Exterior%20Panels_Winter%20v3.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Pepsi%20Halo%20v3.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/20180108_131412.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/20180108_131337%20(1).jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/20230623_172000205_iOS.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/WP_20151023_08_51_06_Pro.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/IMG_0662.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Nintendo%20Skyway.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Digital%20Directory_1.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/1000014942.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/1000015173.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/General%20Vertical_People%20walking.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/1000015006.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Ikea%20072019%20(1).jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/AT&T%20Skyway.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/IMG_0746.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Digital%20Directores_Tenant%20Advertisements.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/1000015107.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/PepsiBottles.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/BCBS_112019%20(10).jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Website-v2.jpg",
  "https://ik.imagekit.io/bug8bug88/Promotion%20&%20Advisement/Digital%20Directory_2.jpg",
];

/**
 * PromotionShowcase Component
 *
 * Section 13: Promotion, Advisement & Naming Rights data showcase.
 * Highlights visitor reach, social media metrics, and Black Friday traffic.
 * Uses shared AutoSlideshow for both image columns.
 */
export default function PromotionShowcase() {
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
      className="promotion-showcase-container relative w-full z-[15] bg-transparent"
      id="promotion-showcase"
    >
      <div
        ref={wrapperRef}
        className="w-full h-auto md:h-[100dvh] md:max-h-[100dvh] bg-white overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.2)] flex flex-col md:grid md:grid-cols-3 md:grid-rows-2"
        style={{ transformOrigin: "bottom center" }}
      >
        {/* Block 1: Top Left — Visitor reach stats (Tan) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 text-white bg-[#B5855A] col-start-1 row-start-1 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0}>
            <h2 className="showcase-promotion-dark promotion-heading">
              <SplitFlipText text="OVER " /><AnimatedNumber value={32} suffix="M+" /><SplitFlipText text=" ANNUAL VISITORS" />
            </h2>
          </FadeRevealText>
          <FadeRevealText delay={0}>
            <h2 className="showcase-promotion-dark promotion-heading">
              <SplitFlipText text="Over " /><AnimatedNumber value={46} suffix="M+" /><SplitFlipText text=" shoppers live within a days drive" />
            </h2>
          </FadeRevealText>
          <FadeRevealText delay={0.1}>
            <p className="showcase-subtext-dark promotion-copy">
              <AnimatedNumber value={99} suffix="%" /><SplitFlipText text=" UNIVERSAL AWARENESS RATING OF THE BRAND MALL OF AMERICA" />
            </p>
          </FadeRevealText>
        </div>

        {/* Block 2: Bottom Left — Ad display slideshow */}
        <div className="col-start-1 row-start-2 h-[50dvh] md:h-full relative overflow-hidden">
          <AutoSlideshow initialImages={IMAGES_2} delay={3500} />
        </div>

        {/* Block 3: Top Middle — Traffic stats (Pink) */}
        <div className="flex flex-col justify-center p-4 md:p-6 lg:p-12 bg-[#cc5a8f] text-neutral-800 col-start-2 row-start-1 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.2}>
            <h3 className="showcase-heading-light promotion-heading">
              <SplitFlipText text="Over " /><AnimatedNumber value={350000} suffix="+" /><SplitFlipText text=" people flood the Mall on Black Friday weekend" />
            </h3>
          </FadeRevealText>
          <FadeRevealText delay={0.3}>
            <p className="showcase-subheading-light promotion-copy">
              <SplitFlipText text="MALL TRAFFIC: " /><AnimatedNumber value={500000} /><SplitFlipText text=" guests" />
            </p>
          </FadeRevealText>
        </div>

        {/* Block 4: Bottom Middle — Social media reach (Blue) */}
        <div className="flex flex-col justify-center p-4 md:p-6 lg:p-12 bg-[#6E7BBD] text-white col-start-2 row-start-2 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.2}>
            <ul className="showcase-list promotion-copy">
              <li><FadeRevealText delay={0.4}><SplitFlipText text="• SOCIAL MEDIA REACH: " /><AnimatedNumber value={1.5} isDecimal={true} decimalPlaces={1} suffix=" million+" /></FadeRevealText></li>
              <li><FadeRevealText delay={0.5}><SplitFlipText text="• " /><AnimatedNumber value={1.3} isDecimal={true} decimalPlaces={1} suffix="M+" /><SplitFlipText text=" Fans Across All Social Accounts" /></FadeRevealText></li>
              <li><FadeRevealText delay={0.6}><SplitFlipText text="• " /><AnimatedNumber value={40} suffix="M+" /><SplitFlipText text=" Annual Social Media Reach" /></FadeRevealText></li>
              <li><FadeRevealText delay={0.6}><SplitFlipText text="• over " /><AnimatedNumber value={5.8} isDecimal={true} decimalPlaces={1} suffix="M+" /><SplitFlipText text=" annual visits to mallofamerica.com website" /></FadeRevealText></li>
            </ul>
          </FadeRevealText>
        </div>

        {/* Block 5: Right — In-mall promotion slideshow (full height) */}
        <div className="col-start-3 row-span-2 h-[100dvh] md:h-full relative overflow-hidden">
          <AutoSlideshow initialImages={IMAGES_1} delay={4200} />
        </div>
      </div>
    </section>
  );
}
