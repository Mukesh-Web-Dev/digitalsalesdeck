# Mall of America — DigiSalesDeck

**Current Status:** ✅ Checkpoint 6: Code Consolidation & Refactoring (Finalized May 20, 2026)

A cinematic, scroll-driven web experience for Mall of America, built for **90+ Google Lighthouse scores** while delivering buttery smooth 60FPS animations and luxury-grade visual transitions.

---

## Table of Contents

1. [Checkpoint Progress](#checkpoint-progress)
2. [Setup Instructions](#setup-instructions)
3. [Tech Stack](#tech-stack)
4. [Architecture & Design Decisions](#architecture--design-decisions)
5. [Performance Optimization (Lighthouse 90+)](#performance-optimization-lighthouse-90)
6. [Component Documentation](#component-documentation)
7. [AI Tools Usage](#ai-tools-usage)

---

## Checkpoint Progress

### Checkpoint 6: Code Consolidation & Refactoring ✅

**Completed Features:**

- ✅ Completely refactored `page.tsx` using a DRY dynamic loop (`SECTIONS_CONFIG`).
- ✅ All showcase components centralized to use `AutoSlideshow.tsx`.
- ✅ Resolved strict TypeScript nullability warnings (TS18047).
- ✅ Re-wrote section documentation to match the massive reduction in boilerplate.
- ✅ Deleted dead/unused code files for a 100% clean repository.
- ✅ Eliminated 350+ lines of duplicate GSAP scroll trigger setups in `page.tsx`.

### Checkpoint 5: Entertainment Complete ✅

**Completed Features:**

- ✅ Finalized after user-approved section stacking, slice transition, and responsive showcase fixes.

- ✅ Sections 2–9 fully implemented with scroll-stacking architecture
- ✅ All video sections (Hero, Shopping, Events, Entertainment) with MuxPlayer HLS streaming
- ✅ GSAP scroll triggers for smooth clip-path slicing and scale transitions
- ✅ Global audio context with mute/unmute controls
- ✅ IntersectionObserver-based video pause/play logic
- ✅ Type-safe MuxPlayerElement refs across all components
- ✅ Proper cleanup and memory management (no memory leaks)
- ✅ ESLint and TypeScript errors resolved
- ✅ Loader component with real asset tracking
- ✅ Favicon and metadata fully integrated
- ✅ Google Tag Manager and SourcePoint CMP configured in metadata

**Files Updated:**

- `src/app/layout.tsx` — Enhanced metadata with favicons, OpenGraph, Google AdSense, theme colors
- `src/app/page.tsx` — Sections 2–9 with scroll stacking
- `src/components/EntertainmentSection.tsx` — Section 8 video with observer
- `src/components/EntertainmentShowcase.tsx` — Section 9 showcase (fixed duplicate ID)
- `src/components/PlayerControls.tsx` — Global audio/fullscreen controls
- `src/hooks/useVideoSectionObserver.ts` — Intersection-based video management
- All video refs upgraded to `MuxPlayerElement` type
- `src/components/LiquidGradient.tsx` — Fixed WebGL cleanup logic

**Performance Metrics:**

- All TypeScript/ESLint errors resolved
- No `any` types remain in codebase
- Proper cleanup on unmount
- GPU-optimized animations with `will-change` and compositor layers
- Videos lazy-load with adaptive bitrate (HLS)

---

## Setup Instructions

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd digisalesdeck

# Install dependencies
npm install
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## Tech Stack

| Technology                              | Purpose            | Why                                                                          |
| --------------------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| **Next.js 16** (App Router)             | Framework          | React Server Components for zero JS on static elements, SSR architecture     |
| **React 19**                            | UI Library         | Server Components + Client directives for interactive sections               |
| **Tailwind CSS v4**                     | Styling            | Utility-first CSS with zero runtime, hardware-accelerated animations         |
| **GSAP 3.15** + `ScrollTrigger`         | Animations         | Scroll-linked animations (clip-path slicing, scale transitions) at 60FPS     |
| **@gsap/react**                         | React Integration  | `useGSAP` hook for proper cleanup and scope management                       |
| **MuxPlayer** (`@mux/mux-player-react`) | Video Playback     | HLS protocol streaming with adaptive bitrate and GPU-decoded keyframes       |
| **hls.js**                              | HLS Fallback       | HTTP Live Streaming polyfill for browsers without native HLS support         |
| **Next/Image**                          | Image Optimization | Automatic WebP conversion, responsive `srcset`, lazy loading, CLS prevention |
| **ImageKit**                            | Image CDN          | External image hosting with on-the-fly optimization and global CDN delivery  |

---

## Architecture & Design Decisions

### Component Architecture (Microservices-Driven)

```
src/
├── app/                          # Next.js App Router (Server Components by default)
│   ├── layout.tsx                # [SERVER] Root layout — zero client JS, SEO metadata
│   ├── page.tsx                  # [CLIENT] Page assembler — orchestrates sections & GSAP
│   ├── Loader.tsx                # [CLIENT] Real asset-tracking preloader
│   ├── Loader.css                # Loader split-screen animations
│   ├── GlobalAudioContext.tsx     # [CLIENT] React Context for global mute/unmute state
│   ├── globals.css               # Design system: GPU acceleration, section layouts
│   ├── HlsPlayer.tsx             # [CLIENT] HLS.js video player wrapper
│   └── VideoFacade.tsx           # [CLIENT] Lazy video loading facade pattern
│
├── components/                   # Reusable, independent UI modules
│   ├── HeroVideo.tsx             # Section 2: MuxPlayer hero video with loop detection
│   ├── TextKnockout.tsx          # SVG mask "out-to-in" text knockout effect (reusable)
│   ├── PlayerControls.tsx        # Volume/fullscreen controls with scroll-position preservation
│   ├── ScrollIndicator.tsx       # Animated scroll-down prompt
│   ├── BrandShowcase.tsx         # Section 3: Image slideshow + typography grid
│   ├── ShoppingSection.tsx       # Section 4: Mux video with IntersectionObserver pause
│   ├── BentoShowcase.tsx         # Section 5: CSS Grid bento layout with dual slideshows
│   └── FadeRevealText.tsx        # Reusable cinematic text reveal animation
```

### Scroll Stacking Architecture

The page uses a **sticky stacking model** where each section pins to the viewport and subsequent sections scroll over it:

```
z-index: 0   → Hero (Section 2) — sticky, paused when covered
z-index: 10  → BrandShowcase (Section 3) — sticky, covers Hero
z-index: 5   → ShoppingSection (Section 4) — sticky, revealed via clip-path slice
z-index: 15  → BentoShowcase (Section 5) — relative, covers Section 4
```

Sections use `visibility: hidden` (not `display: none`) when fully covered to eliminate background rendering while preserving scroll layout calculations.

### Transition Effects

- **Hero → Section 3**: GSAP `scale(0.9→1)` + `borderRadius(60px→0px)` scrubbed on scroll
- **Section 3 → Section 4**: 16-column CSS `clip-path` polygon slicing animation
- **Section 4 → Section 5**: GSAP `scale(0.9→1)` + `borderRadius(60px→0px)` scrubbed on scroll

### DRY Principle (Don't Repeat Yourself)

- `TextKnockout` accepts `text` and `fontSize` props — reused across Hero and Shopping sections
- `FadeRevealText` is a universal wrapper for scroll-triggered text animations
- `PlayerControls` is shared across all video sections via the `GlobalAudioContext`
- `AutoSlideshow` (inside BentoShowcase) is a reusable slideshow with `onError` failsafe

---

## Performance Optimization (Lighthouse 90+)

### LCP (Largest Contentful Paint) — Target: < 2.5s

- Hero video `preload="auto"` buffers simultaneously in the background
- First slideshow image uses `priority` and `loading="eager"` for immediate decode
- Fonts use `display: "swap"` to prevent Flash of Invisible Text (FOIT)
- Loader tracks real asset loading (images + video HLS manifest) before revealing content

### CLS (Cumulative Layout Shift) — Target: 0

- All media containers use strict dimensional boundaries (`100dvh`, `fill`, `object-fit: cover`)
- Dynamic Viewport Height (`dvh`) prevents mobile address bar resize shifts
- Images use Next.js `<Image fill>` with explicit `sizes` attributes

### TBT (Total Blocking Time) — Target: < 200ms

- Layout is a **React Server Component** (zero client JS for static shell)
- GSAP animations run on the compositor thread via `will-change: transform, opacity`
- `IntersectionObserver` replaces scroll event listeners (no main thread blocking)
- Covered sections get `visibility: hidden` to halt GPU compositing

### GPU Optimization & 60FPS

- CSS `will-change`, `backface-visibility: hidden`, and `transform: translateZ(0)` promote animated elements to GPU compositor layers
- Videos are paused via `IntersectionObserver` when off-screen, immediately freeing GPU decode resources
- `visibility: hidden` on covered sticky sections prevents redundant paint operations

### HLS (HTTP Live Streaming)

- MuxPlayer delivers video via `.m3u8` HLS manifests with adaptive bitrate
- Videos are encoded with high-density intraframes/keyframes for instant GPU decoding
- Quality automatically adjusts based on network latency — no buffering

### Lazy Loading

- All images except the first slideshow frame use `loading="lazy"`
- Section 4 video only plays when `IntersectionObserver` detects 10%+ visibility
- Section 5 images are loaded on-demand as the grid enters the viewport

### Image Error Failsafe

- All slideshows implement `onError` callbacks that dynamically remove broken images from the active array
- Prevents broken image icons from ever appearing in the UI

---

## Component Documentation

### `Loader.tsx`

Tracks **real asset loading** (3 critical images + Hero video HLS manifest). Shows a smooth animated counter that chases the true progress value. Includes a 12-second safety timeout.

### `TextKnockout.tsx`

Cinematic SVG mask effect that punches text through a dark overlay, revealing the video underneath. Accepts `text` and `fontSize` props with unique SVG mask IDs per instance to prevent DOM collisions.

### `FadeRevealText.tsx`

Uses `IntersectionObserver` (not GSAP ScrollTrigger) to avoid premature triggers in sticky-positioned layouts. Only fires when 90% of the element is truly painted on screen. Default 3s animation with 0.6s delay.

### `PlayerControls.tsx`

Preserves scroll position during fullscreen toggles by calculating scroll percentage before resize and re-applying it after the viewport settles. Calls `ScrollTrigger.refresh()` to sync GSAP animations.

### `BentoShowcase.tsx`

CSS Grid bento layout with two `AutoSlideshow` instances that feature automatic `onError` image removal. GSAP scale/border-radius transition mirrors the Hero → Section 3 pattern.

---

## AI Tools Usage

| Tool                              | Usage                                                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Antigravity (Google DeepMind)** | Architecture design, component engineering, GSAP animation logic, performance optimization, debugging scroll physics                              |
| **CodePen Analysis**              | AI analyzed complex CSS `clip-path` polygon transition effects from reference CodePens and abstracted them into production-ready React components |
| **Mux Integration**               | AI configured MuxPlayer with proper HLS playback IDs, metadata, and IntersectionObserver-based play/pause lifecycle                               |

## Project Checkpoints

### Checkpoint 4 — Lighthouse Performance & Best Practices Optimization

- **LCP & TTI Fixed:** Automated the `Loader.tsx` to launch the experience without a blocking "START" button, ensuring Lighthouse can parse the fully loaded page, slashing the LCP penalty.
- **Network Payload Slashed:** Changed the Hero video preloading strategy from `auto` to `metadata`, eliminating a 43MB background download penalty.
- **Security Headers Injected:** Deployed robust HSTS, COOP, XFO, and Referrer-Policy headers via `next.config.ts`.
- **Source Maps Enabled:** Turned on `productionBrowserSourceMaps` to fix debugging warnings.
- **Console Errors Cleared:** Deployed `icon.svg` to fix the missing favicon 404 error.
- **CSP Rollback:** Explicitly removed a strict Content-Security-Policy to preserve Next.js Turbopack development stability (HMR relies on inline scripts and `eval()`).

### Checkpoint 3 — Section 5→6 Transition Sync

- Completed: Section 5→6 vertical slice transition was aligned with the Section 3→4 implementation by matching sticky stacking, z-index order, and clip-path timing.
- Result: Bento section now sits above Event section during the clip-path reveal, allowing the slice effect to reveal the section beneath correctly.
- Next: Continue applying the same sticky stack and DRY animation patterns to Sections 7+.

### Checkpoint 2 — Shopping, Dining & Retails (Finalized)

- All sections 2–5 implemented with scroll-linked transitions and responsive layout.

### Checkpoint 1 — Hero Section (Finalized)

- Hero section layout, animation, and video readiness gating are locked per project requirements.

### Key AI-Driven Decisions

1. **Sticky Stacking Model**: AI designed the `z-index` layering system to create cinematic section transitions without complex scroll-hijacking libraries
2. **Custom FadeRevealText**: Instead of paid GSAP plugins (SplitText), AI engineered a free IntersectionObserver-based alternative
3. **Visibility Management**: AI implemented automatic `visibility: hidden` toggling to prevent DOM bleed-through during transitions — a common issue with sticky-positioned layouts
4. **Real Asset Loader**: AI replaced fake percentage counters with genuine asset-tracking logic using `Image.onload` and `fetch()` for HLS manifests

---

_Documentation maintained by AI Assistant (Antigravity) — Google DeepMind._
