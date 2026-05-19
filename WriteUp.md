# Mall of America — DigiSalesDeck
> **Interview Project & Technical Engineering Write-Up**
> 
> *Prepared for the Liat.ai Evaluation Committee*  
> *Submitted by: Candidate Developer*  
> *Subject: Mall of America® Digital Sales Deck*

---

## Executive Summary & Design Rationale

Presenting a world-class, mixed-use mega-property like the **Mall of America®** (32M+ annual visitors, $1B+ sales) requires a tool that matches the scale, energy, and luxury of the destination itself. Traditional PDFs, YouTube clips, and static slides fragment the commercial pitching process. 

This **DigiSalesDeck** is a purpose-built, browser-based, video-first interactive presentation tool. It combines the aesthetic polish of high-end fashion brands (*Saint Laurent, Hermès, Louis Vuitton*) with the interactive micro-animations of modern high-performance web applications. The user controls their journey through fluid, non-linear navigation, utilizing scrolling as the core narrative engine (scrollytelling) to drive retail leasing, event bookings, and corporate sponsorship inquiries.

---

## The 7-Day Development & Engineering Journey

### 📅 Day 1: Demystifying the Brief & Skill Audit
* **Objective**: Fully digest the assignment brief, map out the required story beats (Retail, Attractions, Venues, Demographics, etc.), and perform an honest developer skill-gap analysis.
* **Findings & Action Items**:
  - The brief required a shift from static web layout thinking to **cinematic, scroll-driven presentation flows**.
  - Identified areas requiring deeper research: horizontal motion-blur animation filters, GPU-accelerated staggered text transitions, and realistic crystal glass refraction physics in WebGL (Three.js MeshPhysicalMaterial parameters).
  - Formulated a clear learning plan to ensure 100% compliance with strict Lighthouse Core Web Vitals targets (LCP, CLS, TBT).

---

### 📅 Day 2: Digital Sales Deck Mechanics & Luxury Brand Strategy
* **Objective**: Analyze the format of elite digital pitch decks (like Digideck examples) and decode the UI systems of world-renowned luxury brands (*YSL, Louis Vuitton, Gucci, Apple*).
* **Decisions & Discoveries**:
  - **Minimal Chrome, Maximum Impact**: UI decorations must be hidden or transparent. Navigations should auto-hide, appearing only when the user intentionally hovers near the screen boundaries.
  - **Engraved Aesthetics**: Typography must feel embedded or engraved into the layout, utilizing fine sans-serif lettering with generous letter spacing, appearing with elegant staggers as they enter the screen.
  - **Narrative Scroll (Scrollytelling)**: Designed a vertical sticky stacking system. As the user scrolls, sections stay pinned, and upcoming slides slide over them like card decks, avoiding abrupt page jumps.

---

### 📅 Day 3: Subject Selection & Public Data Mining
* **Objective**: Select a world-class shopping destination and gather rich public media assets, architectural dimensions, and commercial data.
* **Why Mall of America®?**:
  - Spanning 5.6 million square feet, housing a 7-acre Nickelodeon theme park, a 300-foot SEA LIFE underwater aquarium, two luxury hotels, and 500+ stores, it is the ultimate showcase of a mixed-use destination.
  - Gathered exact public leasing parameters: $134M annual food and beverage sales, 370+ annual events, 46 million shoppers residing within a day's drive, and detailed trade area demographics to build a highly persuasive, data-driven pitch.

---

### 📅 Day 4: High-Fidelity UX Wireframing & Layout Boundaries
* **Objective**: Create structural wireframes mapping the 17 sequential slides and video-section transitions, cross-referencing them directly with the assignment requirements.
* **Engineering Solutions Planning**:
  - **Peeling Transitions**: Designed a 16-column vertical slice clip-path transition to cleanly reveal autoplay video loops under the bento showcase grids on scroll.
  - **Dynamic Mobile Bounds**: Planned mobile layout overrides. Since sticky containers (`height: 100dvh`) easily clip long paragraphs on small phone screens, I designed stacked bento blocks and separate scroll divisions for mobile readers to prevent text clipping.
  - **WebGL 3D Coordinates**: Planned Three.js camera offsets so the interactive glass star remains perfectly centered on mobile viewports while shifting to the right on desktops.

---

### 📅 Day 5: Full-Stack Code Implementation & Interactive Animation Engine
* **Objective**: Build the core Next.js application shell, styles, and animation controllers.
* **Implementation Highlights**:
  - **Next.js & Tailwind CSS**: Structured React Server Components for the global shell to deliver zero-JS static rendering.
  - **GSAP & useGSAP**: Wired up scroll-linked clip-paths and scale-downs to create buttery-smooth transitions at a locked 60FPS.
  - **SplitFlipText Component**: Created a GPU-accelerated client component that splits characters, duplicating layers with dynamic inline stagger delays to trigger an alternate vertical flipping wave on hover.
  - **AnimatedNumber Component**: Engineered an IntersectionObserver count-up counter that dynamically triggers a custom horizontal motion-blur SVG filter during increments, resolving to high-contrast crisp numbers on finish.
  - **Interactive 3D Star**: Integrated a WebGL canvas in the contact footer, traversing loaded GLTF assets to inject realistic physical glass properties (`transmission: 1.0`, `ior: 1.52`, `roughness: 0.0`) and pointer drag rotation events.

---

### 📅 Day 6: Media bitrates, CDN Streaming, & AI Copilot Workflows
* **Objective**: Optimize media delivery pipelines, establish CI/CD, and utilize generative AI tools to maximize quality and code efficiency.
* **Engineering Integrations**:
  - **Mux Player API**: Leveraged MuxPlayer for `.m3u8` HLS streaming manifests. Paired with custom observer hooks, the system automatically calls `.pause()` on off-screen or fully covered videos to save CPU cycles and reclaim GPU decoding bandwidth.
  - **ImageKit CDN**: Uploaded all optimized WebP visual slides to ImageKit to ensure global distribution and immediate asset loading.
  - **Adobe Express & Generative AI**: Designed high-quality lifestyle visual slides where real assets were limited, compiling sound files and enhancing image resolutions using Google Gemini's Nano/Banana pipelines.
  - **AI Copilot Workflows**: Heavily relied on Google's advanced **Antigravity** code editor to review, refine, and compact the codebase.

---

### 📅 Day 7: Reflections & The AI Pair-Programming Paradigm
* **Objective**: Perform code refinement, finalize the `README.md`, and complete the screening submission package.
* **Engineering Reflections & Context**:
  - **AI-Copilot Integration**: Under my architectural direction and strict guidance, **95% of the codebase was generated by advanced AI reasoning tools**. I acted as the product builder—designing system boundaries, reviewing TypeScript compilation trees, refactoring messy files into a unified loop (`SECTIONS_CONFIG`), and directing UX decisions.
  - **Personal Health & Time Constraints**: This submission took a week to complete due to two significant challenges: I am currently serving my notice period at my office, and I was simultaneously fighting a severe seasonal throat infection flu that drastically reduced my available daily coding blocks.
  - **Missing Subpages Rationale**: Due to these time constraints and health factors, I focused all resources on creating an absolutely flawless, polished, and robust **Core Interactive Overview (Phase 1)** rather than rushing poorly constructed subpages (Phase 2).
  - **Expandability Proof**: The codebase is architected with a modular, highly scalable structure. Adding new subpages is easily supported via the Next.js App router (`src/app/leasing/page.tsx`, etc.), and presenters can click "EXPLORE" links to jump seamlessly to detail views.
  - **Deep Gratitude**: This screening assignment has been an outstanding experience. It allowed me to push the limits of modern web technologies, scroll performance pipelines, WebGL rendering, and fluid scrollytelling. I am deeply grateful for this opportunity to showcase my craft.

---

## Detailed Tech Stack & Rationale

| Layer | Technology | Version | Purpose & Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `16.2.6` (App Router) | Dynamic SSR, zero-JS server-rendered shell templates, Turbopack speed |
| **Styling** | Vanilla CSS + Tailwind | `v4.x` | CSS variables, hardware-accelerated filters, zero runtime overhead |
| **Animations** | GSAP + ScrollTrigger | `3.12.5` | Links transition clip-paths directly to scrollbar physics at 60FPS |
| **WebGL 3D** | Three.js | `0.160` | Dynamic 3D crystal glass model and interactive liquid trail cursors |
| **Streaming** | Mux Player React | `2.x` | Keyframe-scrubbed HLS playback without buffering or latency |
| **TypeScript** | TypeScript Compiler | `5.x` | Absolute compiler typing safety and code structure enforcement |

---

## Future Roadmap (If Given More Time)

If this screening assessment were not bound by a one-week timeline, I would immediately execute these Phase 2 sub-module extensions:

### 1. Clickable Leasing Path Dashboard
* Implement segmented category pipelines: **Luxury Flaps**, **Standard Retail**, **Food & Beverage**, and **Pop-up activations**.
* Present prospective tenants with interactive floorplans where they can click occupied/vacant units, see exact foot traffic projections, and initiate a direct digital lease application.

### 2. Interactive Venue Booking Calendar
* Expand the **Huntington Bank Rotunda** and **Executive Center** spaces with a real-time booking scheduler.
* Allow event promoters to input event capacities, select lighting packages, view 3D mockups of the spaces, and receive instant venue leasing quotes.

### 3. Integrated Sponsorship ROI Calculator
* Allow corporate sponsors to slider-select their desired marketing reach (e.g. 5M social reach vs 32M mall visitors).
* Instantly generate cost estimates, showcase available naming rights areas, and render simulated preview displays inside the virtual mall.

---
*Thank you for your time, review, and consideration. I look forward to discussing how I can bring this high standard of technical execution and design sensibility to the Liat.ai team.*
