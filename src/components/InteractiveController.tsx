"use client";

import { useEffect, useRef } from "react";
import { useGlobalAudio } from "../app/GlobalAudioContext";

// Sequential list of section IDs in the digital sales deck
const SECTION_IDS = [
  "hero-section",
  "brand-showcase-container",
  "shopping-section-container",
  "bento-section-container",
  "event-section-container",
  "event-showcase-container",
  "entertainment-section-container",
  "entertainment-bento-container",
  "private-venues-section-container",
  "private-venues-bento-container",
  "promotion-section-container",
  "promotion-bento-container",
  "demographics-bento-container",
  "hospitality-section-container",
  "contact-us-container"
];

/**
 * InteractiveController Component
 * 
 * Enriches the luxury digital sales deck with:
 * 1. Keyboard shortcuts:
 *    - Down Arrow / Page Down / Space: Next slice
 *    - Up Arrow / Page Up: Previous slice
 *    - Home: Jump to top
 *    - End: Jump to contact info (bottom)
 *    - 'M' / 'm' key: Toggle global audio mute/unmute
 *    - 'S' / 's' key: Open/trigger native sharing menu
 * 2. Mobile / Tablet Swipe Gestures:
 *    - Swipe Up: Smooth transition to next slice
 *    - Swipe Down: Smooth transition to previous slice
 * 3. Accessibility & Focus Protections:
 *    - Automatic input/textarea escape to avoid hijacking typing.
 *    - 800ms scroll throttling to prevent layout shift loops and ensure perfect 60FPS animations.
 */
export default function InteractiveController() {
  const { isMuted, setIsMuted } = useGlobalAudio();
  const touchStartY = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);
  const scrollCooldown = 850; // ms to match browser CSS rendering stabilizations

  const getSectionOffsets = () => {
    return SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      return el ? { id, top: el.offsetTop } : null;
    }).filter((item): item is { id: string; top: number } => item !== null);
  };

  const navigateToSection = (direction: "next" | "prev" | "first" | "last") => {
    if (isScrolling.current) return;

    const offsets = getSectionOffsets();
    if (offsets.length === 0) return;

    const currentScroll = window.scrollY;
    let targetTop: number | null = null;

    if (direction === "first") {
      targetTop = offsets[0].top;
    } else if (direction === "last") {
      targetTop = offsets[offsets.length - 1].top;
    } else if (direction === "next") {
      // Find the first section strictly below the current viewport
      const target = offsets.find((offset) => offset.top > currentScroll + 15);
      if (target) targetTop = target.top;
    } else if (direction === "prev") {
      // Find the last section strictly above the current viewport
      const reversed = [...offsets].reverse();
      const target = reversed.find((offset) => offset.top < currentScroll - 15);
      if (target) targetTop = target.top;
    }

    if (targetTop !== null) {
      isScrolling.current = true;
      
      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, scrollCooldown);
    }
  };

  useEffect(() => {
    // Keyboard Event Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcut inputs if typing inside an interactive input field
      const active = document.activeElement;
      if (active && (
        active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.tagName === "SELECT" ||
        active.hasAttribute("contenteditable")
      )) {
        return;
      }

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          navigateToSection("next");
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          navigateToSection("prev");
          break;
        case "Spacebar":
        case " ":
          // Only take over Spacebar if not scrolling inside editable containers
          e.preventDefault();
          navigateToSection(e.shiftKey ? "prev" : "next");
          break;
        case "Home":
          e.preventDefault();
          navigateToSection("first");
          break;
        case "End":
          e.preventDefault();
          navigateToSection("last");
          break;
        case "m":
        case "M":
          e.preventDefault();
          setIsMuted(!isMuted);
          break;
        case "s":
        case "S":
          e.preventDefault();
          const shareBtn = document.querySelector('button[onClick*="handleShareOpen"]') as HTMLButtonElement | null;
          if (shareBtn) shareBtn.click();
          break;
        default:
          break;
      }
    };

    // Mobile / Tablet Touch Events
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY.current;

      // Threshold of 60px to count as an intended swipe gesture
      if (Math.abs(deltaY) > 60) {
        if (deltaY < 0) {
          // Swiped Up -> Scroll Down to next section
          navigateToSection("next");
        } else {
          // Swiped Down -> Scroll Up to previous section
          navigateToSection("prev");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMuted, setIsMuted]);

  return null; // Invisible global event controller
}
