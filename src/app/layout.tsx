import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

/**
 * Font Loading Strategy:
 * Uses Next.js built-in font optimization which automatically self-hosts fonts,
 * eliminating render-blocking external requests (improves LCP and TBT).
 */
const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevents FOIT (Flash of Invisible Text) for better LCP
  adjustFontFallback: false,
});

const geistMono = Inter_Tight({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

/**
 * SEO Metadata
 * Comprehensive metadata for SEO, social sharing, and brand identity.
 * Includes favicons, theme colors, and Open Graph for social media preview.
 */
export const metadata: Metadata = {
  title: "Mall of America® | The Biggest Mall in North America",
  description:
    "Visit Mall of America® to shop 500+ stores, enjoy world-class dining, and experience thrilling attractions in Bloomington, MN. The #1 retail and entertainment destination.",
  keywords: [
    "Mall of America",
    "shopping",
    "dining",
    "entertainment",
    "retail",
    "Minneapolis",
    "Bloomington",
    "attractions",
    "luxury shopping",
  ],
  authors: [{ name: "DigiSalesDeck" }],
  generator: "DigiSalesDeck",

  openGraph: {
    title: "Mall of America® | The Biggest Mall in North America",
    description:
      "Visit Mall of America® to shop 500+ stores, enjoy world-class dining, and experience thrilling attractions in Bloomington, MN.",
    type: "website",
    url: "https://www.mallofamerica.com/",
    siteName: "Mall of America",
    images: [
      {
        url: "https://www.mallofamerica.com/sites/default/files/2017-10/hours-hero-first_card.jpg",
        width: 1200,
        height: 630,
        alt: "Mall of America",
      },
    ],
  },

  // Apple/iOS specific metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },

  icons: {
    icon: [
      {
        rel: "icon",
        url: "https://www.mallofamerica.com/sites/default/files/2017-10/hours-hero-first_card.jpg",
        sizes: "16x16",
        type: "image/jpeg",
      },
      {
        rel: "icon",
        url: "https://www.mallofamerica.com/sites/default/files/2017-10/hours-hero-first_card.jpg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        rel: "shortcut icon",
        url: "https://www.mallofamerica.com/sites/default/files/2017-10/hours-hero-first_card.jpg",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        url: "https://www.mallofamerica.com/sites/default/files/2017-10/hours-hero-first_card.jpg",
        sizes: "180x180",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "https://www.mallofamerica.com/sites/default/files/2017-10/hours-hero-first_card.jpg",
        color: "#ffffff",
      },
    ],
  },

  // Additional metadata
  other: {
    "google-adsense-account": "ca-pub-8461342238483227",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage":
      "https://www.mallofamerica.com/sites/default/files/2017-10/hours-hero-first_card.jpg",
    "theme-color": "#ffffff",
  },
};

/**
 * Viewport Configuration
 * Separated from metadata per Next.js 16 best practices.
 * themeColor prevents browser chrome flash on load.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

import { GlobalAudioProvider } from "./GlobalAudioContext";
import ScrollProgress from "../components/ScrollProgress";
import ClickSpark from "../components/ClickSpark";

/**
 * RootLayout (Server Component)
 *
 * This is a React Server Component — zero JS is shipped to the client for this file.
 * Only the children (marked "use client") will hydrate on the browser.
 * This achieves the SSR architecture requirement.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalAudioProvider>
          {children}
          <ScrollProgress />
          <ClickSpark />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            style={{ display: "block", width: 0, height: 0, position: "absolute", pointerEvents: "none" }}
          >
            <defs>
              <filter id="blurFilter">
                <feGaussianBlur id="blurFilterItem" in="SourceGraphic" stdDeviation="13,0" />
              </filter>
            </defs>
          </svg>
          <div
            className="brand-name"
            style={{
              position: "fixed",
              opacity: "60%",
              top: "20px",
              left: "20px",
              zIndex: 999,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <span style={{ height: "60px", width: "60px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width="60px"
                height="60px"
                fill="#FFFFFF"
              >
                <path d="m378-337 102-78 102 78-38-124 114-91H521l-41-126-40 126H302l115 91-39 124ZM243-144l90-291L96-624h291l93-288 93 288h291L627-435l90 291-237-180-237 180Zm237-364Z" />
              </svg>
            </span>
            <span>Mall Of America</span>
          </div>
        </GlobalAudioProvider>
      </body>
    </html>
  );
}
