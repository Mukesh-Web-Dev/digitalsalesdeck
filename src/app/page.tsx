"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import type MuxPlayerElement from "@mux/mux-player";
import { useGlobalAudio } from "./GlobalAudioContext";
import Loader from "./Loader";
import HeroVideo from "../components/HeroVideo";
import TextKnockout from "../components/TextKnockout";
import PlayerControls from "../components/PlayerControls";
import ScrollIndicator from "../components/ScrollIndicator";
import ScrollToTop from "../components/ScrollToTop";
import InteractiveController from "../components/InteractiveController";

import BrandShowcase from "../components/BrandShowcase";
const ShoppingSection = dynamic(() => import("../components/ShoppingSection"), {
  ssr: false,
  loading: () => null,
});
const BentoShowcase = dynamic(() => import("../components/BentoShowcase"), {
  ssr: false,
  loading: () => null,
});
const EventSection = dynamic(() => import("../components/EventSection"), {
  ssr: false,
  loading: () => null,
});
const EventsShowcase = dynamic(() => import("@/components/EventsShowcase"), {
  ssr: false,
  loading: () => null,
});
const EntertainmentSection = dynamic(
  () => import("@/components/EntertainmentSection"),
  { ssr: false, loading: () => null }
);
const EntertainmentShowcase = dynamic(
  () => import("@/components/EntertainmentShowcase"),
  { ssr: false, loading: () => null }
);
const VenueSpacesSection = dynamic(
  () => import("@/components/VenueSpacesSection"),
  { ssr: false, loading: () => null }
);
const VenueSpacesShowcase = dynamic(
  () => import("@/components/VenueSpacesShowcase"),
  { ssr: false, loading: () => null }
);
const PromotionSection = dynamic(
  () => import("@/components/PromotionSection"),
  { ssr: false, loading: () => null }
);
const PromotionShowcase = dynamic(
  () => import("@/components/PromotionShowcase"),
  { ssr: false, loading: () => null }
);
const DemographicsShowcase = dynamic(
  () => import("@/components/DemographicsShowcase"),
  { ssr: false, loading: () => null }
);
const HospitalitySection = dynamic(
  () => import("@/components/HospitalitySection"),
  { ssr: false, loading: () => null }
);
const ContactFooter = dynamic(() => import("@/components/ContactFooter"), {
  ssr: false,
  loading: () => null,
});

const CLIP_FULL =
  "polygon(0% 0%, 6.25% 0%, 6.25% 100%, 6.25% 100%, 6.25% 100%, 6.25% 0%, 12.5% 0%, 12.5% 100%, 12.5% 100%, 12.5% 0%, 18.75% 0%, 18.75% 100%, 18.75% 100%, 18.75% 0%, 25% 0%, 25% 100%, 25% 100%, 25% 0%, 31.25% 0%, 31.25% 100%, 31.25% 100%, 31.25% 0%, 37.5% 0%, 37.5% 100%, 37.5% 100%, 37.5% 0%, 43.75% 0%, 43.75% 100%, 43.75% 100%, 43.75% 0%, 50% 0%, 50% 100%, 50% 100%, 50% 0%, 56.25% 0%, 56.25% 100%, 56.25% 100%, 56.25% 0%, 62.5% 0%, 62.5% 100%, 62.5% 100%, 62.5% 0%, 68.75% 0%, 68.75% 100%, 68.75% 100%, 68.75% 0%, 75% 0%, 75% 100%, 75% 100%, 75% 0%, 81.25% 0%, 81.25% 100%, 81.25% 100%, 81.25% 0%, 87.5% 0%, 87.5% 100%, 87.5% 100%, 87.5% 0%, 93.75% 0%, 93.75% 100%, 93.75% 100%, 93.75% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLIP_HIDDEN =
  "polygon(6.25% 0%, 6.25% 0%, 6.25% 100%, 6.25% 100%, 12.5% 100%, 12.5% 0%, 12.5% 0%, 12.5% 100%, 18.75% 100%, 18.75% 0%, 18.75% 0%, 18.75% 100%, 25% 100%, 25% 0%, 25% 0%, 25% 100%, 31.25% 100%, 31.25% 0%, 31.25% 0%, 31.25% 100%, 37.5% 100%, 37.5% 0%, 37.5% 0%, 37.5% 100%, 43.75% 100%, 43.75% 0%, 43.75% 0%, 43.75% 100%, 50% 100%, 50% 0%, 50% 0%, 50% 100%, 56.25% 100%, 56.25% 0%, 56.25% 0%, 56.25% 100%, 62.5% 100%, 62.5% 0%, 62.5% 0%, 62.5% 100%, 68.75% 100%, 68.75% 0%, 68.75% 0%, 68.75% 100%, 75% 100%, 75% 0%, 75% 0%, 75% 100%, 81.25% 100%, 81.25% 0%, 81.25% 0%, 81.25% 100%, 87.5% 100%, 87.5% 0%, 87.5% 0%, 87.5% 100%, 93.75% 100%, 93.75% 0%, 93.75% 0%, 93.75% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 6.25% 100%)";

/**
 * Configuration for all sequential sticky sections.
 * This ensures the DRY principle is followed for dynamic section rendering and animation mapping.
 */
const SECTIONS_CONFIG = [
  {
    id: "brand-showcase-container",
    Component: BrandShowcase,
    zIndex: 10,
    height: "103dvh",
    hasSlice: true,
    alwaysRender: true,
  },
  {
    id: "shopping-section-container",
    Component: ShoppingSection,
    zIndex: 5,
    height: "180dvh",
    hasSlice: false,
  },
  {
    id: "bento-section-container",
    Component: BentoShowcase,
    zIndex: 20,
    height: "103dvh",
    hasSlice: true,
  },
  {
    id: "event-section-container",
    Component: EventSection,
    zIndex: 15,
    height: "180dvh",
    hasSlice: false,
  },
  {
    id: "event-showcase-container",
    Component: EventsShowcase,
    zIndex: 30,
    height: "103dvh",
    hasSlice: true,
  },
  {
    id: "entertainment-section-container",
    Component: EntertainmentSection,
    zIndex: 29,
    height: "180dvh",
    hasSlice: false,
  },
  {
    id: "entertainment-bento-container",
    Component: EntertainmentShowcase,
    zIndex: 40,
    height: "103dvh",
    hasSlice: true,
  },
  {
    id: "private-venues-section-container",
    Component: VenueSpacesSection,
    zIndex: 35,
    height: "180dvh",
    hasSlice: false,
  },
  {
    id: "private-venues-bento-container",
    Component: VenueSpacesShowcase,
    zIndex: 50,
    height: "103dvh",
    hasSlice: true,
  },
  {
    id: "promotion-section-container",
    Component: PromotionSection,
    zIndex: 45,
    height: "180dvh",
    hasSlice: false,
  },
  {
    id: "promotion-bento-container",
    Component: PromotionShowcase,
    zIndex: 60,
    height: "103dvh",
    hasSlice: false,
  },
  {
    id: "demographics-bento-container",
    Component: DemographicsShowcase,
    zIndex: 70,
    height: "103dvh",
    hasSlice: true,
  },
  {
    id: "hospitality-section-container",
    Component: HospitalitySection,
    zIndex: 65,
    height: "180dvh",
    hasSlice: false,
  },
];

export default function Home() {
  const playerRef = useRef<MuxPlayerElement | null>(null);
  const { setIsMuted } = useGlobalAudio();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showKnockout, setShowKnockout] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const isLoadedRef = useRef(false);

  // Consolidated visibility and loaded states (DRY principle)
  const [sectionVisibility, setSectionVisibility] = useState<
    Record<string, boolean>
  >({});
  const [sectionLoaded, setSectionLoaded] = useState<Record<string, boolean>>(
    {}
  );
  const [heroVisible, setHeroVisible] = useState(true);
  const [showContactFooter, setShowContactFooter] = useState(false);

  const [shareOpen, setShareOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [shareUrl] = useState(() =>
    typeof window !== "undefined" ? window.location.href : ""
  );
  const sharePopupRef = useRef<HTMLDivElement | null>(null);
  const shareTimeoutRef = useRef<number | null>(null);
  const contactSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!shareOpen) return;
    if (shareTimeoutRef.current) window.clearTimeout(shareTimeoutRef.current);
    shareTimeoutRef.current = window.setTimeout(
      () => setShareOpen(false),
      6000
    );
    return () => {
      if (shareTimeoutRef.current) window.clearTimeout(shareTimeoutRef.current);
    };
  }, [shareOpen]);

  useEffect(() => {
    if (!shareOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sharePopupRef.current &&
        !sharePopupRef.current.contains(event.target as Node)
      ) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [shareOpen]);

  const handleShareOpen = () => setShareOpen(true);

  const handleShareCopy = async () => {
    if (navigator.clipboard && shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("Link copied");
    }
    setShareOpen(false);
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Mall of America Partnership");
    const body = encodeURIComponent(`Check out this page: ${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    setShareOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: "Mall of America Partnership",
          text: "Explore this experience",
          url: shareUrl,
        });
      } catch {}
    } else {
      setShareMessage("Native share unavailable");
    }
    setShareOpen(false);
  };

  useEffect(() => {
    function handleResize() {
      document.body.setAttribute(
        "data-window-width",
        window.innerWidth.toString()
      );
      document.body.setAttribute(
        "data-window-height",
        window.innerHeight.toString()
      );
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle resize and fullscreen change to refresh GSAP ScrollTrigger
  useEffect(() => {
    let timeoutId: any;

    const handleResizeOrFullscreen = () => {
      if (timeoutId) clearTimeout(timeoutId);

      // Debounce the refresh to allow browser DOM and CSS dvh/vh units to stabilize
      timeoutId = setTimeout(async () => {
        try {
          const { ScrollTrigger } = await import("gsap/ScrollTrigger");
          // Clear scroll memories and force complete recalculation of triggers
          ScrollTrigger.clearScrollMemory();
          ScrollTrigger.refresh(true);
        } catch (error) {}
      }, 250); // 250ms matches the transition settle timing of standard browsers
    };

    window.addEventListener("resize", handleResizeOrFullscreen);
    document.addEventListener("fullscreenchange", handleResizeOrFullscreen);
    document.addEventListener("webkitfullscreenchange", handleResizeOrFullscreen);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResizeOrFullscreen);
      document.removeEventListener("fullscreenchange", handleResizeOrFullscreen);
      document.removeEventListener("webkitfullscreenchange", handleResizeOrFullscreen);
    };
  }, []);

  // Contact Footer observer
  useEffect(() => {
    const contactContainer = document.getElementById("contact-us-container");
    if (!contactContainer) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            setShowContactFooter(true);
            setSectionVisibility((prev) => ({
              ...prev,
              "hospitality-section-container": false,
            }));
          } else if (entry.intersectionRatio <= 0.05) {
            setShowContactFooter(false);
            setSectionVisibility((prev) => ({
              ...prev,
              "hospitality-section-container": true,
            }));
          }
        });
      },
      { threshold: [0.05, 0.15, 0.5], rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(contactContainer);
    return () => observer.disconnect();
  }, []);

  // Lazy loading observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
            setSectionLoaded((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { rootMargin: "240px 0px 240px 0px", threshold: [0.05, 0.25] }
    );
    SECTIONS_CONFIG.forEach((config) => {
      const el = document.getElementById(config.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Visibility management: hide fully-covered sections and manage Hero pause/play
  useEffect(() => {
    const makeObserver = (sectionId: string) =>
      new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.intersectionRatio < 0.8;
          if (sectionId === "hero-section") {
            setHeroVisible(isVisible);
            if (!isVisible) {
              playerRef.current?.pause();
            } else if (isLoadedRef.current) {
              playerRef.current?.play().catch(() => {});
            }
          } else {
            setSectionVisibility((prev) => ({
              ...prev,
              [sectionId]: isVisible,
            }));
          }
        },
        { threshold: [0, 0.8] }
      );

    const observers: { observer: IntersectionObserver; target: HTMLElement }[] =
      [];

    // Hero covers
    const s0 = document.getElementById(SECTIONS_CONFIG[0].id);
    if (s0)
      observers.push({ observer: makeObserver("hero-section"), target: s0 });

    for (let i = 0; i < SECTIONS_CONFIG.length - 1; i++) {
      const nextEl = document.getElementById(SECTIONS_CONFIG[i + 1].id);
      if (nextEl) {
        observers.push({
          observer: makeObserver(SECTIONS_CONFIG[i].id),
          target: nextEl,
        });
      }
    }

    observers.forEach(({ observer, target }) => observer.observe(target));
    return () => observers.forEach(({ observer }) => observer.disconnect());
  }, []);

  // GSAP Animations
  useEffect(() => {
    let isMounted = true;
    let ctx: { revert?: () => void } | null = null;

    async function setupAnimations() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!isMounted) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-section",
          { filter: "blur(0px)" },
          {
            filter: "blur(12px)",
            ease: "none",
            scrollTrigger: {
              trigger: "#" + SECTIONS_CONFIG[0].id,
              start: "top 40%",
              end: "top top",
              scrub: true,
            },
          }
        );

        function createVerticalSlice(
          targetSelector: string,
          triggerSelector: string
        ) {
          gsap.fromTo(
            targetSelector,
            { clipPath: CLIP_FULL },
            {
              clipPath: CLIP_HIDDEN,
              ease: "none",
              scrollTrigger: {
                trigger: triggerSelector,
                start: "top 80%",
                end: "top top",
                scrub: true,
              },
            }
          );
        }

        // Loop through sections for Slice and Blur effects
        for (let i = 0; i < SECTIONS_CONFIG.length - 1; i++) {
          const curr = SECTIONS_CONFIG[i];
          const next = SECTIONS_CONFIG[i + 1];

          if (curr.hasSlice) {
            createVerticalSlice("#" + curr.id, "#" + next.id);
          }

          // Alternating blur intensities as per original code logic (8px or 12px)
          const blurAmount = curr.hasSlice ? "8px" : "12px";
          gsap.fromTo(
            "#" + curr.id,
            { filter: "blur(0px)" },
            {
              filter: `blur(${blurAmount})`,
              ease: "none",
              scrollTrigger: {
                trigger: "#" + next.id,
                start: "top 80%",
                end: "top top",
                scrub: true,
              },
            }
          );
        }
      }, document.body);
    }
    setupAnimations();
    return () => {
      isMounted = false;
      ctx?.revert?.();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100dvh" }}>
      <ScrollToTop />
      <div className="fixed right-20 bottom-4 z-[99999] select-none text-[0.55rem] uppercase tracking-[0.35em] text-white">
        <button
          type="button"
          onClick={handleShareOpen}
          className="cursor-pointer text-white"
        >
          SHARE
        </button>
      </div>
      {shareOpen && (
        <div
          ref={sharePopupRef}
          className="fixed right-4 bottom-14 z-[99999] flex w-auto flex-col gap-2 select-none text-[0.72rem] uppercase tracking-[0.35em] text-white"
          style={{ minWidth: 160 }}
        >
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="text-left text-white cursor-pointer"
            >
              Native Share
            </button>
          )}
          <button
            type="button"
            onClick={handleShareCopy}
            className="text-left text-white cursor-pointer"
          >
            Copy Link
          </button>
          <button
            type="button"
            onClick={handleShareEmail}
            className="text-left text-white cursor-pointer"
          >
            Share by Email
          </button>
          {shareMessage && (
            <span className="text-[0.65rem] text-white/70">{shareMessage}</span>
          )}
        </div>
      )}

      {!isLoaded && (
        <Loader
          videoReady={videoReady}
          onComplete={() => {
            setIsLoaded(true);
            isLoadedRef.current = true;
            setIsMuted(false);
            setTimeout(() => {
              const hero = document.getElementById("hero-section");
              const isHeroVisible = hero && hero.style.visibility !== "hidden";
              if (
                isHeroVisible &&
                playerRef.current &&
                typeof playerRef.current.play === "function"
              ) {
                playerRef.current.play().catch(() => {});
              }
            }, 100);
          }}
        />
      )}

      {/* HERO SECTION */}
      <div
        id="hero-section"
        className="hero-section"
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          zIndex: 0,
          overflow: "hidden",
          backgroundColor: "#111",
          visibility: heroVisible ? "visible" : "hidden",
        }}
      >
        <HeroVideo
          playerRef={playerRef}
          onFirstLoopComplete={() => setShowKnockout(true)}
          onReady={() => setVideoReady(true)}
        />
        <TextKnockout
          show={showKnockout}
          text="MALL OF AMERICA"
          fontSize="8vw"
        />
        <ScrollIndicator />
        <PlayerControls />
      </div>

      {/* DYNAMIC SECTIONS */}
      {SECTIONS_CONFIG.map((config) => (
        <div
          key={config.id}
          id={config.id}
          style={{
            position: "sticky",
            top: 0,
            zIndex: config.zIndex,
            height: config.height,
            visibility:
              sectionVisibility[config.id] !== false ? "visible" : "hidden",
          }}
        >
          {(config.alwaysRender || sectionLoaded[config.id]) && (
            <config.Component />
          )}
        </div>
      ))}

      {/* FOOTER SECTION */}
      <div
        ref={contactSentinelRef}
        style={{ position: "relative", width: "100%", height: "100%" }}
      />
      <div
        id="contact-us-container"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100dvh",
          height: "100dvh",
          zIndex: 999,
          backgroundColor: "#050505",
          overflow: "hidden",
        }}
      >
        {showContactFooter && <ContactFooter />}
      </div>
    </div>
  );
}
