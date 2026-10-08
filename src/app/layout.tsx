import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  applicationName: "cppvalley",
  title: {
    default: "cppvalley — C++ systems courses & engineering notes",
    template: "%s · cppvalley",
  },
  description:
    "Focused C++ systems courses and engineering notes for HFT, EDA, concurrency, GPU and AI infrastructure.",
  keywords: [
    "C++ systems programming",
    "C++ courses",
    "HFT engineering",
    "low latency C++",
    "EDA software engineering",
    "GPU programming",
    "AI systems",
  ],
  authors: [{ name: "cppvalley", url: "https://www.youtube.com/@cppvalley" }],
  creator: "cppvalley",
  publisher: "cppvalley",
  alternates: {
    canonical: "https://cppvalley.com",
    types: {
      "application/rss+xml": [{ url: "https://cppvalley.com/rss.xml", title: "cppvalley Blog" }],
    },
  },
  openGraph: {
    title: "cppvalley — C++ systems courses & engineering notes",
    description: "Focused courses and long-form notes on C++, HFT, EDA, concurrency, GPU and AI systems.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "cppvalley" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — C++ systems courses & engineering notes",
    description: "Focused courses and engineering notes for serious systems learners.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://cppvalley.com/#website",
      name: "cppvalley",
      url: "https://cppvalley.com",
      description: "C++ systems courses and engineering notes.",
      inLanguage: "en",
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://cppvalley.com/#organization",
      name: "cppvalley",
      url: "https://cppvalley.com",
      sameAs: ["https://www.youtube.com/@cppvalley"],
      teaches: ["Modern C++", "Systems programming", "HFT systems", "EDA software", "GPU programming", "AI systems"],
    },
    {
      "@type": "ItemList",
      name: "cppvalley sections",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Courses", url: "https://cppvalley.com/courses" },
        { "@type": "ListItem", position: 2, name: "Blog", url: "https://cppvalley.com/blog" },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        {adsenseClient ? (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
