"use client";

import { useState, useEffect, useRef } from "react";
import "./Loader.css";

/**
 * Critical assets that must be loaded before the experience starts.
 * These are tracked individually and contribute to the real loading percentage.
 */
const CRITICAL_IMAGES = [
  "https://ik.imagekit.io/bug8bug88/leasing_development-future-expansion.jpg?updatedAt=1779034201879",
  "https://ik.imagekit.io/bug8bug88/MOA_Exterior.jpg?updatedAt=1779034170767",
  "https://ik.imagekit.io/bug8bug88/employment-hub-hero.jpg?updatedAt=1779034164547",
];

interface LoaderProps {
  onComplete: () => void;
  /** True when the hero video's canPlay event has fired (enough frames buffered) */
  videoReady: boolean;
}

export default function Loader({ onComplete, videoReady }: LoaderProps) {
  const [realProgress, setRealProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const loadedCount = useRef(0);
  // Total = critical images + 1 for video buffer readiness
  const totalAssets = CRITICAL_IMAGES.length + 1;
  const isReadyToStart = displayProgress >= 100 && videoReady;

  useEffect(() => {
    const markLoaded = () => {
      loadedCount.current += 1;
      const pct = Math.round((loadedCount.current / totalAssets) * 100);
      setRealProgress(pct);
    };

    // 1. Preload critical images
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = markLoaded;
      img.onerror = markLoaded; // Count failures too so the loader doesn't hang
    });

    // Safety timeout: if assets haven't loaded after 15s, force completion
    const safetyTimer = setTimeout(() => {
      setRealProgress(100);
    }, 15000);

    return () => clearTimeout(safetyTimer);
  }, [totalAssets]);

  // 2. Track video buffer readiness as the final asset
  useEffect(() => {
    if (videoReady) {
      // Only increment once when videoReady flips to true
      loadedCount.current += 1;
      const pct = Math.round((loadedCount.current / totalAssets) * 100);
      setRealProgress((prev) => Math.max(prev, pct));
    }
  }, [videoReady, totalAssets]);

  // Smooth animated counter that chases realProgress
  useEffect(() => {
    if (displayProgress >= 100 || displayProgress >= realProgress) return;

    const timer = window.setTimeout(() => {
      // Accelerate towards the real value, but never jump instantly
      const diff = realProgress - displayProgress;
      const step = Math.max(1, Math.floor(diff * 0.15));
      setDisplayProgress((prev) => Math.min(prev + step, realProgress));
    }, 40);

    return () => window.clearTimeout(timer);
  }, [displayProgress, realProgress]);

  useEffect(() => {
    // We no longer auto-fade out. We wait for user click to bypass autoplay policy.
    // The button click will set fadeOut to true and trigger onComplete.
  }, []);

  const handleStart = () => {
    if (!isReadyToStart) return;
    setFadeOut(true);
    window.setTimeout(onComplete, 1000);
  };

  return (
    <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader_top"></div>
      <div className="loader_bottom"></div>

      {isReadyToStart ? (
        <button className="start-button" onClick={handleStart}>
          START
        </button>
      ) : (
        <div id="loader">
          <span id="text">
            {displayProgress < 100 ? "Loading...." : "Buffering video..."}
          </span>
          <span id="percent">{displayProgress}%</span>
          <div
            id="bar"
            style={{ transform: `scaleX(${displayProgress / 100})` }}
          ></div>
        </div>
      )}
    </div>
  );
}
