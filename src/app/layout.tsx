import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marketplace.css";
import "./institute.css";
import "./brand-consistency.css";
import "./cmu.css";
import "./blog-engagement.css";
import "./platform.css";
import "./youtube-udemy.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  applicationName: "cppvalley",
  title: {
    default: "cppvalley — C++ Systems, EDA, HFT & AI Interview Prep",
    template: "%s · cppvalley",
  },
  description:
    "Explore C++ interview preparation, EDA software engineering, HFT systems, low-latency C++, AI systems, projects, videos, book notes and interview questions for students and engineers.",
  keywords: [
    "C++ interview preparation",
    "C++ roadmap for college students",
    "modern C++ interview questions",
    "EDA software engineer roadmap",
    "EDA interview preparation",
    "semiconductor software engineer",
    "VLSI CAD software",
    "HFT interview preparation",
    "HFT internship preparation",
    "low latency C++",
    "C++ systems programming",
    "AI systems interview",
    "C++ design patterns",
    "C++ multithreading",
    "trading systems",
    "cppvalley YouTube",
    "C++ book summaries",
    "C++ projects for resume",
  ],
  authors: [{ name: "cppvalley", url: "https://www.youtube.com/@cppvalley" }],
  creator: "cppvalley",
  publisher: "cppvalley",
  category: "Education",
  alternates: {
    canonical: "https://cppvalley.com",
  },
  openGraph: {
    title: "cppvalley — C++ Systems, EDA, HFT & AI Interview Prep",
    description:
      "A focused learning hub for C++, EDA software, HFT, low-latency systems and AI systems interviews — with courses, embedded videos, projects, book notes and interview questions.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/cppvalley-logo.webp", width: 1200, height: 593, alt: "cppvalley logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — C++ Systems Interview Prep",
    description: "C++, EDA, HFT, low-latency systems and AI systems interview preparation.",
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
  themeColor: "#ffffff",
  colorScheme: "light",
};

const logoFitCss = `
.site-logo .market-brand,
.lesson-logo .market-brand {
  width: 150px !important;
  height: 64px !important;
  min-width: 150px !important;
  background-size: contain !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}

@media (max-width: 720px) {
  .site-logo .market-brand,
  .lesson-logo .market-brand {
    width: 116px !important;
    height: 52px !important;
    min-width: 116px !important;
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
        "C++ systems learning hub for EDA software, HFT, low-latency engineering and AI systems interview preparation.",
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://cppvalley.com/blog?query={search_term_string}",
        "query-input": "required name=search_term_string",
      },
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
        "low-latency C++",
        "AI systems engineering",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://cppvalley.com/#learning-hubs",
      name: "cppvalley learning hubs",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Courses", url: "https://cppvalley.com/courses" },
        { "@type": "ListItem", position: 2, name: "Videos", url: "https://cppvalley.com/youtube" },
        { "@type": "ListItem", position: 3, name: "Interview Questions", url: "https://cppvalley.com/interviews" },
        { "@type": "ListItem", position: 4, name: "Projects", url: "https://cppvalley.com/projects" },
        { "@type": "ListItem", position: 5, name: "Book Notes", url: "https://cppvalley.com/books" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{logoFitCss}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
