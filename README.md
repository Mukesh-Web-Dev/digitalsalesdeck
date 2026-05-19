# Mall of America — DigiSalesDeck
> **A Cinematic, Scroll-Driven Luxury Sales Presentation Deck**
>
> Built for **90+ Google Lighthouse scores**, delivering buttery smooth 60FPS transitions, custom WebGL graphics, and responsive luxury-brand typography scaling across all screen sizes (from compact smartphones up to 86" 4K boardroom smart TVs).

---

## Table of Contents

1. [Folder Structure & Architecture](#1-folder-structure--architecture)
2. [Technology Stack](#2-technology-stack)
3. [Cinematic Design Philosophy & Luxury Aesthetics](#3-cinematic-design-philosophy--luxury-aesthetics)
4. [Scroll Physics & Sticky Stacking Architecture](#4-scroll-physics--sticky-stacking-architecture)
5. [Device-Agnostic Global Responsiveness System](#5-device-agnostic-global-responsiveness-system)
6. [Performance Optimization & Core Web Vitals](#6-performance-optimization--core-web-vitals)
7. [Installation & Development Setup](#7-installation--development-setup)
8. [The AI Collaborative Development Journey (Antigravity)](#8-the-ai-collaborative-development-journey-antigravity)

---

## 1. Folder Structure & Architecture

The application is engineered with a **modular component architecture** following the DRY (Don't Repeat Yourself) principle. All static presentation metadata is centralized in client-side configuration arrays to avoid repeated scroll-trigger and layout declarations.

```
digisalesdeck/
├── public/                       # Static Assets & WebGL Assets
│   ├── favicon.ico               # Standard application favicon
│   └── model/
│       └── star.glb              # High-fidelity 3D Crystal Star glTF asset
│
├── src/
│   ├── app/                      # Next.js App Router (Server-rendered shell by default)
│   │   ├── layout.tsx            # [SERVER] SEO Meta, fonts, Google Tags, and global DOM structure
│   │   ├── page.tsx              # [CLIENT] Master layout compiler; loops config to render sticky sections
│   │   ├── Loader.tsx            # [CLIENT] Asset preloader with real manifest and image tracking
│   │   ├── Loader.css            # Hardware-accelerated split-screen loading styles
│   │   ├── globals.css           # Global design system, typography scaling, and animation keyframes
│   │   └── GlobalAudioContext.tsx # [CLIENT] Unified React context for synchronized video muting
│   │
│   ├── components/               # Pure, independent React components
│   │   ├── AnimatedNumber.tsx    # Multi-instance motion-blur counter count-up system
│   │   ├── AutoSlideshow.tsx     # High-performance, auto-sliding WebP image slideshow with error failsafes
│   │   ├── BentoShowcase.tsx     # Section 5: Bento Grid representing Shopping, Dining & Retails stats
│   │   ├── BrandShowcase.tsx     # Section 3: Core brand overview and sales numbers split layout
│   │   ├── ClickSpark.tsx        # Capture-phase SVG radial spark particle generator on clicks
│   │   ├── ContactFooter.tsx     # Section 17: Partnerships contact, Three.js WebGL glass star, & custom cursor
│   │   ├── DemographicsShowcase.tsx # Section 15: Regional demographics and trade area statistics
│   │   ├── EntertainmentSection.tsx # Section 8: Entertainment video viewport wrapper
│   │   ├── EntertainmentShowcase.tsx # Section 9: Theme park, SEA LIFE, and hotels bento statistics
│   │   ├── EventSection.tsx      # Section 6: Hosting and bank rotunda video viewport wrapper
│   │   ├── EventsShowcase.tsx    # Section 7: Huntington Bank Rotunda spaces layout
│   │   ├── FadeRevealText.tsx    # IntersectionObserver-triggered cinematic text fade-in
│   │   ├── HeroVideo.tsx         # Section 2: Autoplay cinematic video section and loop manager
│   │   ├── HospitalitySection.tsx# Section 16: Security, sustainability, and services video wrapper
│   │   ├── InteractiveController.tsx # Swipe gestures, keyboard shortcuts, and scrolling throttle manager
│   │   ├── PlayerControls.tsx    # Mute toggle and fullscreen buttons with layout-shift protections
│   │   ├── PromotionSection.tsx  # Section 12: Branding and naming rights video wrapper
│   │   ├── PromotionShowcase.tsx # Section 13: Traffic statistics and social media reach showcase
│   │   ├── ScrollIndicator.tsx   # Floating scroll prompt for the hero section
│   │   ├── ScrollProgress.tsx    # Sleek vertical silver scrollbar progress tracker
│   │   ├── ScrollToTop.tsx       # Floating "TOP" anchor button appearing past hero section
│   │   ├── ShoppingSection.tsx   # Section 4: Shopping video wrapper
│   │   ├── SplitFlipText.tsx     # GPU-accelerated alternate character flipping on cursor hover
│   │   ├── TextKnockout.tsx      # Punch-through SVG masking revealing video inside letters
│   │   ├── VenueSpacesSection.tsx# Section 10: Gathering venues and meeting spaces video wrapper
│   │   ├── VenueSpacesShowcase.tsx # Section 11: Executive center and group spaces stats bento
│   │   └── VideoSection.tsx      # HLS player container coordinating IntersectionObserver auto play/pause
│   │
│   └── hooks/                    # Reusable React hooks
│       ├── useVideoClickToggle.ts # Click-to-pause tracking to block automatic trigger resumptions
│       └── useVideoSectionObserver.ts # Intersection observers pausing offscreen/covered video players
```

---

## 2. Technology Stack

| Technology | Layer | Purpose | Rationale |
| :--- | :--- | :--- | :--- |
| **Next.js 16 (App Router)** | Framework | Server-Side Rendering (SSR) | React Server Components for zero-JS static layouts, swift page assembly |
| **React 19** | Library | Component Lifecycle | Modern client-side triggers, DOM references, state synchronization |
| **Vanilla CSS & Tailwind v4** | Style Engine | Premium Styling | Zero runtime-overhead styles, composited layout transitions, responsive design |
| **Three.js** | WebGL | 3D Graphics | Powers the clear crystal glass star rendering and interactive cursor mouse trail |
| **GSAP (GreenSock) & useGSAP** | Animation | Scroll Transitions | Delivers buttery smooth 60FPS scroll-linked clipping and sizing translations |
| **Mux Player** | Video Engine | Cinematic Playback | HLS streaming manifests, adaptive bitrates, instant GPU frame decoding |
| **hls.js** | Streaming | HLS Polyfills | Fallback playback safety on older browsers lacking native HLS support |
| **TypeScript** | Language | Compiler Safety | Static type-checking across complex refs and Three.js environments |

---

## 3. Cinematic Design Philosophy & Luxury Aesthetics

Inspired by elite luxury houses (e.g., *Saint Laurent, Louis Vuitton, Gucci, Hermès*), the interface is engineered to evoke visual weight, premium craftsmanship, and absolute fluidity:

1. **Luxury Typography**: Utilizing clean, embedded, and engraved sans-serif fonts with wide spacing, dynamic text shadows, and light font weights.
2. **Alternate Character Flipping**: Standard text links feature the custom **`SplitFlipText`** system. When hovered, alternate characters translate up or down in an elegant staggered wave using GPU composition layers (`will-change: transform`).
3. **Horizontal Motion-Blur Numbers**: The statistical counters utilize **`AnimatedNumber`** with dynamic SVG SVG filters. During rapid count-ups, the digits blur horizontally to suggest high-impact velocity, resolving to a crisp, high-contrast state upon reaching their final value.
4. **Buttery Scrolling & Fluid Transitions**: The viewport scroll actions translate into slides of a presentation scrolling vertically. Outgoing slides are covered by upcoming slides via GSAP scroll scrubbing.
5. **Interactive WebGL Assets**: 
   - **Tubes Cursor**: Generates a smooth, liquid trail that responds directly to coordinates on the contact screen. A click event propagates random vibrant colors through the tubes.
   - **Glassmorphic Crystal Star**: A gorgeous interactive 3D model with realistic glass transmission parameters (Index of Refraction: `1.52`, roughness: `0.0`, transmission: `1.0`) that auto-rotates and allows users to manually spin/inspect it using pointer events.

---

## 4. Scroll Physics & Sticky Stacking Architecture

A primary architectural challenge was delivering scroll-driven slides without forcing slow, fragile, scroll-hijacking libraries that conflict with hardware scroll wheels.

### Z-Index Layering & Clipping Mechanics
The DigiSalesDeck is assembled as a continuous timeline of **sticky viewport wrappers** (`height: 100dvh` / `180dvh`) layered over each other. 
1. As the user scrolls, incoming sections are layered above existing ones using incremental `z-index` blocks:
   ```
   z-index: 0   → Hero Video Section
   z-index: 10  → Brand Showcase (Scrubbed clip-path reveal)
   z-index: 5   → Shopping Video Section
   z-index: 20  → Bento Showcase (Scrubbed clip-path reveal)
   ```
2. **Vertical 16-Column Clip-Path Slice**: During showcase-to-video transitions, a GSAP-linked `clip-path` animation applies a vertical strip-slice polygon mask, peeling the active showcase away to reveal the autoplay cinematic HLS video playing underneath.
3. **ScrollTrigger Stabilization**: Toggling full screen or resizing standard laptop viewports can recalculate CSS `vh/dvh` units, causing GSAP triggers to offset. To prevent this, a debounced handler captures resize events, clears scroll memories, and calls `ScrollTrigger.refresh(true)` to reset all triggers.

---

## 5. Device-Agnostic Global Responsiveness System

To support massive 4K boardroom presentation TVs as well as compact smartphones, the application deploys a modular responsiveness system:

### 1. Dynamic Root Typography Scaling
Instead of using fixed font sizes, all typography, margins, and paddings are defined in `rem` units tied to a fluid root CSS font scale:
- **Smartphones / Mobile**: Base root `14px` - `16px`.
- **Standard Laptops / Desktops**: Base root `16px` - `18px`.
- **Large Monitors / 4K TV Screens (min-width: 2560px)**: Scales root to `21px`.
- **Boardroom Projectors / 86" smart TVs (min-width: 3840px)**: Scales root to `25px`.
This ensures that the entire layout, grid grids, and spaced luxury labels grow in perfect proportion on colossal displays.

### 2. Viewport-Safe Mobile Bento Adaptations (Screens < 768px)
Applying a rigid sticky stacking system to mobile devices risks clipping long paragraphs. The mobile system implements these safety boundaries:
* **The Bento Grid Stack (2-Column, 3-Row)**: Restructures the 3-column desktop layout into a proportional grid fitting inside a `100dvh` viewport, clamping statistical font sizes (`clamp(2rem, 5vw, 4rem)`) to prevent number truncation.
* **Proportional Side-by-Side Splits**: In sections like `BrandShowcase` and `DemographicsShowcase`, the mobile viewport is divided strictly into `30dvh` for the image slideshow and `70dvh` for the text metadata, enabling overflow scroll layers on long paragraphs to preserve readability.

### 3. Dynamic 3D WebGL Coordinates
On narrow aspect ratios, static 3D coordinate offsets drift off-screen. The `ContactFooter` component implements a responsive bounds updater inside the Three.js render loop:
- **Mobile Viewports (< 768px)**: The 3D star is scaled to `0.07` and positioned centrally behind the text block (`x = 0, y = 1.3, z = 0`).
- **Desktop Viewports (>= 768px)**: The star is scaled to `0.1` and shifted right (`x = 2.5, y = 1, z = 0`), aligning with the contact cards.

---

## 6. Performance Optimization & Core Web Vitals

To satisfy a strict **Lighthouse score of 90+**, the deck utilizes several performance engineering techniques:

### LCP (Largest Contentful Paint) — Target < 2.5s
* **Real-Asset preloader (`Loader.tsx`)**: Tracks loading of critical image assets and the Hero video HLS manifest, releasing the loader immediately once ready to bypass Lighthouse LCP penalties.
* **Preloaded WebP Poster Frames**: Heavy video files load poster images eagerly with `priority` attributes, giving the user instant visual coverage while heavy stream chunks buffer.

### CLS (Cumulative Layout Shift) — Target: 0.00
* **Dimensional Boundaries**: All image components use Next.js `<Image>` with explicit width/height metrics or `fill` envelopes inside responsive bounding parent boxes.
* **Viewport Unit Locking**: Using `dvh` (Dynamic Viewport Height) locks structural boxes against browser address-bar transitions on mobile devices.

### TBT (Total Blocking Time) — Target < 200ms
* **Hardware-Accelerated Compositing**: Text hover animations and slide clip-path animations are promoted to GPU compositor layers via CSS `will-change` properties.
* **Programmatic Resource Reclaiming**: The custom hook `useVideoSectionObserver` detects when video sections leave the viewport or are fully covered, instantly calling `.pause()` on the players to free up CPU cycles and GPU decoders.
* **CSS Covered Visibility**: Fully covered sticky slides are set to `visibility: hidden` to block background repaint cycles.

---

## 7. Installation & Development Setup

### Prerequisites
* **Node.js**: `v18.x` or newer (Recommended: `v20.x`)
* **npm**: `v9.x` or newer

### Installation Steps
1. Clone the project and navigate to the directory:
   ```bash
   git clone <repository-url>
   cd digisalesdeck
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```

### Local Development
Launch the local dev server using Next.js Turbopack:
```bash
npm run dev
# The application will be accessible at http://localhost:3000
```

### Production Build & Staging Launch
Compile type-safe production bundles and launch:
```bash
# Verify typescript and compile build packages
npm run build

# Start production server
npm run start
```

### Code Quality & Formatting
Run TypeScript checks and linting rules locally before code commits:
```bash
# Run compiler checks
npx tsc --noEmit

# Run Next.js linter checks
npm run lint
```

---

## 8. The AI Collaborative Development Journey (Antigravity)

This digital sales deck was engineered through an advanced, collaborative **AI-assisted development process** using **Antigravity (Google DeepMind)**.

### Collaborative Development Paradigm
1. **Interactive Design Iterations**: The structural scroll stacking, GPU letters flipping (`SplitFlipText`), and horizontal motion blurs (`AnimatedNumber`) were engineered through AI analysis of interactive CodePen references. The AI parsed raw CSS and Vanilla JS, converting them into modular, type-safe Next.js client components.
2. **Rigorous Compaction & DRY Refactoring**: To ensure long-term stability and lighting-fast loads, the AI executed a comprehensive codebase compaction:
   - Centralized multiple duplicate image and layout showcases into a single universal configuration loop (`SECTIONS_CONFIG`).
   - Slashed over **350 lines of duplicate GSAP scroll-triggers** and combined observers into highly reusable React hooks (`useVideoSectionObserver`).
   - Cleaned up the repository by identifying and deleting all dead code and empty assets, ensuring clean version control.
3. **Rigorous Type-Safety Audits**: The AI maintained type integrity by removing all fallback `any` types, using strict interfaces (`MuxPlayerElement`), and executing compiler reviews to guarantee perfect builds.

---
*DigiSalesDeck — Re-engineered & Maintained with Antigravity (Advanced Agentic Coding, Google DeepMind).*
