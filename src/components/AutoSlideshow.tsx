"use client";

import { useState, useEffect } from "react";

interface AutoSlideshowProps {
  /** Array of CDN image URLs to cycle through */
  initialImages: string[];
  /** Milliseconds between slide transitions. Defaults to 3000ms */
  delay?: number;
  /** Image sizes attribute for responsive loading. Defaults to bento-grid size */
  sizes?: string;
}

/**
 * AutoSlideshow Component
 *
 * Reusable cross-fade image carousel used across all Showcase sections.
 * Bypasses Next.js image proxy overhead by rendering a standard HTML img tag,
 * loading ultra-lightweight, edge-compressed assets directly from the ImageKit CDN.
 * Features an onError failsafe that removes broken images from the array.
 *
 * Used by: BentoShowcase, EntertainmentShowcase, VenueSpacesShowcase, PromotionShowcase
 */
export default function AutoSlideshow({
  initialImages,
  delay = 3000,
}: AutoSlideshowProps) {
  const [images, setImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, delay);
    return () => clearInterval(interval);
  }, [images, delay]);

  if (images.length === 0) return null;

  /**
   * CDN Image Optimization Helper
   * Directs the ImageKit CDN to return a high-compression optimized asset (q-40)
   * with a capped width of 800px. This reduces file sizes down to ~15KB.
   */
  const getOptimizedUrl = (url: string) => {
    if (!url) return url;
    if (url.includes("imagekit.io")) {
      const separator = url.includes("?") ? "&" : "?";
      // Apply quality 40, width 800px, and auto-format conversions
      return `${url}${separator}tr=w-800,q-40,f-auto`;
    }
    return url;
  };

  return (
    <div className="relative w-full h-full bg-neutral-900 overflow-hidden">
      {images.map((src, index) => (
        <img
          key={src}
          src={getOptimizedUrl(src)}
          alt={`Slideshow image ${index + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          onError={() => {
            // Remove broken image from array to preserve layout flow
            setImages((prev) => prev.filter((img) => img !== src));
            if (currentIndex >= images.length - 1) {
              setCurrentIndex(0);
            }
          }}
        />
      ))}
    </div>
  );
}
