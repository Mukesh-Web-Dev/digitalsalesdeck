"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
  value: number;              // Target value to count up to
  duration?: number;          // Duration of counting animation in ms
  prefix?: string;            // Text before the number (e.g. "$")
  suffix?: string;            // Text after the number (e.g. "M+")
  className?: string;         // Extra custom Tailwind/CSS classes
  isDecimal?: boolean;        // Whether the number has a decimal point
  decimalPlaces?: number;     // Number of decimal places to show if isDecimal is true
}

/**
 * AnimatedNumber Component
 * 
 * Multi-instance safe horizontal motion blur count-up counter.
 * Uses IntersectionObserver to trigger animation when visible.
 * Applies a horizontal blur filter dynamically during fast increments, 
 * resolving to a crisp, high-end rendering once target is achieved.
 */
export default function AnimatedNumber({
  value,
  duration = 1000,
  prefix = "",
  suffix = "",
  className = "",
  isDecimal = false,
  decimalPlaces = 1,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startCountUp();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, value]);

  const startCountUp = () => {
    setIsAnimating(true);
    const startTime = performance.now();
    const startValue = 0;
    const targetValue = value;

    const tick = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Ease Out Cubic: gives a rapid start with a gentle finish
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + easeProgress * (targetValue - startValue);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(targetValue);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(tick);
  };

  const formatNumber = (val: number) => {
    if (isDecimal) {
      // For decimals (like 5.6)
      return val.toFixed(decimalPlaces);
    }
    // For large integers, format with thousands separator commas (like 300,000)
    return Math.floor(val).toLocaleString("en-US");
  };

  return (
    <span
      ref={elementRef}
      className={className}
      style={{
        display: "inline-block",
        filter: isAnimating ? "url(#blurFilter)" : "none",
        transition: "filter 0.08s ease-out",
        willChange: "filter",
      }}
    >
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}
