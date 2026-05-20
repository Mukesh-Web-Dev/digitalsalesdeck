"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface AutoSlideshowProps {
  /** Array of CDN image URLs to cycle through */
  initialImages: string[];
  /** Milliseconds between slide transitions. Defaults to 3000ms */
  delay?: number;
  /** Image sizes attribute for responsive loading. Defaults to bento-grid size */
  sizes?: string;
}

/**
 * Reusable cross-fade image carousel used across all Showcase sections.
 * Features an onError failsafe that removes broken images from the array
 * so the layout never breaks on a failed CDN request.
 *
 * Used by: BentoShowcase, EntertainmentShowcase, VenueSpacesShowcase, PromotionShowcase
 */

/**
 * Custom ImageKit Loader for Next.js Image component.
 * Directs the browser to fetch pre-resized, highly compressed WebP/AVIF images
 * straight from the ImageKit edge network, bypassing Vercel serverless functions.
 */
const imageKitLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  if (!src) return "";
  if (src.includes("imagekit.io")) {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}tr=w-${width},q-${quality || 70},f-auto`;
  }
  return src;
};

export default function AutoSlideshow({
  initialImages,
  delay = 3000,
  sizes = "(max-width: 768px) 100vw, 33vw",
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

  return (
    <div className="relative w-full h-full bg-neutral-900 overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={src}
          loader={imageKitLoader}
          src={src}
          alt={`Slideshow image ${index + 1}`}
          fill
          className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          sizes={sizes}
          loading="lazy"
          quality={70} // Directs the loader with quality 70
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
