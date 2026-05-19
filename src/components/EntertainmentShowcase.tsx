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

/** Entertainment attraction images — right column tall slideshow */
const IMAGES_1 = [
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Travel%20Wall.jpg?updatedAt=1779120731858",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SEA%20LIFE%20-%20Family%20with%20Clownfish.jpg?updatedAt=1779120712972",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/5D%20Extreme%20Attraction%20by%20Matrix%20Technology%20.jpg?updatedAt=1779120633068",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Rock-of-ages-blacklight-minigolf.jpg?updatedAt=1779120624733",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/peli2025ftn0710_010-scaled.jpeg?updatedAt=1779120585839",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Roll%20the%20Dice.jpg?updatedAt=1779123419600",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/20220516_MOA_MooseMountain-Hole11Teens%207(1).jpg?updatedAt=1779123415437",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/MOA19_BCamD2-0063.jpg?updatedAt=1779123408827",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/20220518_MOA_Crayola-CrayonMaker%2014.jpg?updatedAt=1779123403072",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/MOA19_BCamD1-0635.jpg?updatedAt=1779123396818",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/20220518_MOA_Crayola-PuttyMachine%206.jpg?updatedAt=1779123394886",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/MOA19_BCamD2-0640.jpg?updatedAt=1779123391285",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/20220518_MOA_Crayola-Store%20118.jpg?updatedAt=1779123388931",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Crayola2.jpg?updatedAt=1779123384850",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/hours+Direction.png?updatedAt=1779121103392",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Star_Express.jpg?updatedAt=1779121102678",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SEA%20LIFE%20-%20Kids%20at%20Touchpool.jpg?updatedAt=1779121099250",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SEA%20LIFE%20-%20Lined%20seahorse.jpeg?updatedAt=1779121092099",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/MOA19_BCamD2-0956.jpg?updatedAt=1779121091804",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Escape_game.png?updatedAt=1779121091285",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Crayola1.jpg?updatedAt=1779120776409",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SEA%20LIFE%20-%20White%20Tip%20Reef%20Shark.jpg?updatedAt=1779120753124",
];

/** SEA LIFE & park images — bottom-left slideshow */
const IMAGES_2 = [
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SEA%20LIFE%20-%20Family%20at%20Touch%20Pool.jpg?updatedAt=1779120725918",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SEA%20LIFE%20-%20Staff%20holding%20Skink%20with%20Family%20at%20Ranger%20Stage.jpg?updatedAt=1779120712365",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/active%20gaming%20facility.jpg?updatedAt=1779120664027",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/NU_2.jpg?updatedAt=1779120638707",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/area_attractions.jpg?updatedAt=1779120627500",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SeaLife_1.jpg?updatedAt=1779120601928",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/msg2017opn0610_065-scaled.jpeg?updatedAt=1779120597265",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/crayola_tenant.jpg?updatedAt=1779120596438",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SEA%20LIFE%20-%20Couple%20taking%20selfie%20inside%20Ocean%20Tunnel.jpg?updatedAt=1779120584645",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/B&B%20Theatres.jpg?updatedAt=1779120583393",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/SEA%20LIFE%20-%20Green%20Sea%20Turtle.jpg?updatedAt=1779120583186",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Untitled-14723.jpg?updatedAt=1779120575122",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/museum-of-illusions.jpg?updatedAt=1779120571477",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/fair-on-4.jpg?updatedAt=1779120571575",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Parkview_Rounds.jpg?updatedAt=1779120567215",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/mcm_hero-ruins_0.jpg?updatedAt=1779120559490",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Shopping_9.jpg?updatedAt=1779120559293",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Sealife.jpg?updatedAt=1779120555208",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Nickelodeon%20Universe.jpg?updatedAt=1779120554757",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/FlyOver%20America.jpg?updatedAt=1779120548229",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/MooseMountain.jpg?updatedAt=1779120532824",
  "https://ik.imagekit.io/bug8bug88/Entertainment%20/Spin%20Art%202.jpg?updatedAt=1779120491146",
];

/**
 * EntertainmentShowcase Component
 *
 * Section 9: Entertainment data showcase.
 * CSS Grid bento layout highlighting key entertainment stats and attractions.
 * Uses shared AutoSlideshow for both image columns.
 */
export default function EntertainmentShowcase() {
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
      id="entertainment-showcase"
    >
      <div
        ref={wrapperRef}
        className="w-full h-auto md:h-[100dvh] md:max-h-[100dvh] bg-white overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.2)] flex flex-col md:grid md:grid-cols-3 md:grid-rows-2"
        style={{ transformOrigin: "bottom center" }}
      >
        {/* Block 1: Top Left — Leasing stats (Tan) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 text-white bg-[#B5855A] col-start-1 row-start-1 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.3}>
            <p className="text-md uppercase tracking-widest text-white/80 mb-2"><SplitFlipText text="Nearly" /></p>
            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              <AnimatedNumber value={300000} />
            </h2>
            <p className="text-lg md:text-xl font-medium uppercase tracking-wide">
              <SplitFlipText text="Square feet leased" />
            </p>
            <div className="w-12 h-px bg-white/40 my-8"></div>
            <ul className="space-y-3 text-[1rem] md:text-lg font-light">
              <li><SplitFlipText text="Over " /><span className="font-semibold"><AnimatedNumber value={45} /><SplitFlipText text=" new leases" /></span><SplitFlipText text=" signed" /></li>
              <li><span className="font-semibold"><AnimatedNumber value={33} /><SplitFlipText text=" first to market concepts" /></span><SplitFlipText text=" to debut" /></li>
            </ul>
          </FadeRevealText>
        </div>

        {/* Block 2: Bottom Left — Attractions slideshow */}
        <div className="col-start-1 row-start-2 h-[50dvh] md:h-full relative overflow-hidden">
          <AutoSlideshow initialImages={IMAGES_2} delay={3500} />
        </div>

        {/* Block 3: Top Middle — Investment & rankings (Light Beige) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-[#F4F1ED] text-neutral-800 col-start-2 row-start-1 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.1}>
            <ul className="space-y-4 md:space-y-6 text-[1rem] md:text-lg lg:text-xl font-light tracking-wide">
              <li>
                <span className="font-semibold"><SplitFlipText text="MALL OF AMERICA®" /></span><SplitFlipText text=" HAS SPENT OVER " /><AnimatedNumber value={500} prefix="$" suffix="M" /><SplitFlipText text=" IN RENOVATIONS & ADDITIONS TO THE PROPERTY" />
              </li>
              <li>
                <span className="font-semibold"><AnimatedNumber value={100} /><SplitFlipText text=" PLACES TO TAKE YOUR KIDS BEFORE THEY GROW UP" /></span>
              </li>
            </ul>
          </FadeRevealText>
        </div>

        {/* Block 4: Bottom Middle — Attraction list (Blue) */}
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-[#6E7BBD] text-white col-start-2 row-start-2 h-[50dvh] md:h-full overflow-hidden">
          <FadeRevealText delay={0.2}>
            <p className="text-sm md:text-md uppercase tracking-[0.2em] mb-2"><SplitFlipText text="OVER" /></p>
            <ul className="showcase-list">
              <li><FadeRevealText delay={0.4}><SplitFlipText text="• " /><AnimatedNumber value={7} /><SplitFlipText text=" acre theme park area" /></FadeRevealText></li>
              <li><FadeRevealText delay={0.5}><SplitFlipText text="• " /><AnimatedNumber value={2} /><SplitFlipText text=" mini golf courses" /></FadeRevealText></li>
              <li><FadeRevealText delay={0.6}><SplitFlipText text="• An aquarium" /></FadeRevealText></li>
              <li><FadeRevealText delay={0.6}><SplitFlipText text="• A ropes course with a zip line" /></FadeRevealText></li>
              <li><FadeRevealText delay={0.6}><SplitFlipText text="• " /><AnimatedNumber value={2} /><SplitFlipText text=" Luxury hotels attached to the Mall" /></FadeRevealText></li>
            </ul>
          </FadeRevealText>
        </div>

        {/* Block 5: Right — Entertainment slideshow (full height) */}
        <div className="col-start-3 row-span-2 h-[100dvh] md:h-full relative overflow-hidden">
          <AutoSlideshow initialImages={IMAGES_1} delay={4200} />
        </div>
      </div>
    </section>
  );
}
