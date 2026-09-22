import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import "./ads.css";
import "./video-course-player.css";
import "./ui-system.css";
import "./mdx-article.css";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  applicationName: "cppvalley",
  title: {
    default: "cppvalley — C++ Systems, HFT, EDA, GPU & AI Systems",
    template: "%s · cppvalley",
  },
  description:
    "C++, HFT, EDA/CAD, CUDA, GPU and AI systems courses with interview questions, blog posts and book summaries.",
  keywords: [
    "C++ interview preparation",
    "C++ systems programming",
    "HFT interview preparation",
    "low latency C++",
    "EDA software engineer roadmap",
    "CUDA GPU programming",
    "AI systems engineering",
    "C++ interview questions",
    "cppvalley"
  ],
  authors: [{ name: "cppvalley", url: "https://www.youtube.com/@cppvalley" }],
  creator: "cppvalley",
  publisher: "cppvalley",
  category: "Education",
  alternates: {
    canonical: "https://cppvalley.com",
    types: {
      "application/rss+xml": [{ url: "https://cppvalley.com/rss.xml", title: "cppvalley Blog" }],
    },
  },
  openGraph: {
    title: "cppvalley — C++ Systems Courses",
    description:
      "Courses for C++, HFT, EDA/CAD, CUDA, GPU and AI systems preparation.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "cppvalley C++ systems courses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — C++ Systems Courses",
    description: "C++, HFT, EDA, CUDA, GPU and AI systems courses.",
    images: ["/opengraph-image"],
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
  themeColor: "#365c7d",
  colorScheme: "light",
};

const logoFitCss = `
.site-logo .market-brand,
.lesson-logo .market-brand {
  width: 128px !important;
  height: 44px !important;
  min-width: 128px !important;
  background-size: contain !important;
  background-position: left center !important;
  background-repeat: no-repeat !important;
}

.site-footer-logo .market-brand {
  width: 128px !important;
  height: 44px !important;
  min-width: 128px !important;
  background-size: contain !important;
  background-position: left center !important;
  background-repeat: no-repeat !important;
}

@media (max-width: 760px) {
  .site-logo .market-brand,
  .lesson-logo .market-brand {
    width: 120px !important;
    height: 42px !important;
    min-width: 120px !important;
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
        "C++ systems learning platform for HFT, EDA/CAD, CUDA, GPU and AI systems preparation.",
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
      name: "cppvalley pages",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Courses", url: "https://cppvalley.com/courses" },
        { "@type": "ListItem", position: 2, name: "Interview Questions", url: "https://cppvalley.com/interviews" },
        { "@type": "ListItem", position: 3, name: "Blog", url: "https://cppvalley.com/blog" },
        { "@type": "ListItem", position: 4, name: "Books", url: "https://cppvalley.com/books" }
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
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
