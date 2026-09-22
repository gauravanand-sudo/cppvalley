import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "./brand-consistency.css";
import "./site-stable.css";
import "./course-catalog.css";
import "./curriculum-platform.css";
import "./ads.css";
import "./seo-growth.css";
import "./stanford-theme.css";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  applicationName: "cppvalley",
  title: {
    default: "cppvalley — C++ Systems, HFT, EDA, GPU & AI Systems",
    template: "%s · cppvalley",
  },
  description:
    "Learn C++ systems, HFT, low-latency engineering, EDA/CAD software, CUDA, GPU programming, AI systems, projects, videos and interview questions.",
  keywords: [
    "C++ interview preparation",
    "C++ roadmap for college students",
    "modern C++ interview questions",
    "EDA software engineer roadmap",
    "CUDA GPU programming",
    "AI systems engineering",
    "HFT interview preparation",
    "HFT internship preparation",
    "low latency C++",
    "C++ systems programming",
    "C++ multithreading",
    "trading systems",
    "cppvalley YouTube",
    "C++ projects for resume"
  ],
  authors: [{ name: "cppvalley", url: "https://www.youtube.com/@cppvalley" }],
  creator: "cppvalley",
  publisher: "cppvalley",
  category: "Education",
  alternates: {
    canonical: "https://cppvalley.com",
    types: {
      "application/rss+xml": [{ url: "https://cppvalley.com/rss.xml", title: "cppvalley Articles" }],
    },
  },
  openGraph: {
    title: "cppvalley — C++ Systems, HFT, EDA, GPU & AI Systems",
    description:
      "An academic-style learning platform for C++, HFT, low-latency systems, EDA/CAD software, CUDA, GPU programming and AI systems interviews.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/cppvalley-logo.webp", width: 1200, height: 593, alt: "cppvalley logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — C++ Systems Learning",
    description: "C++, HFT, EDA, CUDA, GPU and AI systems interview preparation.",
    images: ["/cppvalley-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#8c1515",
  colorScheme: "light",
};

const logoFitCss = `
.site-logo .market-brand,
.lesson-logo .market-brand {
  width: 146px !important;
  height: 54px !important;
  min-width: 146px !important;
  background-size: contain !important;
  background-position: left center !important;
  background-repeat: no-repeat !important;
}

.site-footer-logo .market-brand {
  width: 156px !important;
  height: 58px !important;
  min-width: 156px !important;
  background-size: contain !important;
  background-position: left center !important;
  background-repeat: no-repeat !important;
}

@media (max-width: 760px) {
  .site-logo .market-brand,
  .lesson-logo .market-brand {
    width: 122px !important;
    height: 46px !important;
    min-width: 122px !important;
  }
}
`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://cppvalley.com/#website",
      name: "cppvalley",
      url: "https://cppvalley.com",
      description:
        "C++ systems learning platform for HFT, EDA/CAD software, CUDA, GPU programming and AI systems interview preparation.",
      inLanguage: "en",
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://cppvalley.com/#organization",
      name: "cppvalley",
      url: "https://cppvalley.com",
      sameAs: ["https://www.youtube.com/@cppvalley"],
      areaServed: "Worldwide",
      teaches: [
        "Modern C++",
        "C++ interview preparation",
        "EDA software engineering",
        "HFT systems",
        "CUDA and GPU programming",
        "low-latency C++",
        "AI systems engineering"
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://cppvalley.com/#learning-hubs",
      name: "cppvalley learning hubs",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Courses", url: "https://cppvalley.com/courses" },
        { "@type": "ListItem", position: 2, name: "Video Courses", url: "https://cppvalley.com/youtube" },
        { "@type": "ListItem", position: 3, name: "Interview Questions", url: "https://cppvalley.com/interviews" },
        { "@type": "ListItem", position: 4, name: "Projects", url: "https://cppvalley.com/projects" },
        { "@type": "ListItem", position: 5, name: "Articles", url: "https://cppvalley.com/blog" }
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <style>{logoFitCss}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
