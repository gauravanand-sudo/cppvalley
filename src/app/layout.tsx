import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marketplace.css";
import "./institute.css";
import "./brand-consistency.css";
import "./cmu.css";
import "./blog-engagement.css";
import "./platform.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  title: {
    default: "cppvalley — C++, EDA, HFT & AI Systems Interview Prep",
    template: "%s · cppvalley",
  },
  description:
    "cppvalley is a focused learning hub for C++ interviews, EDA software, HFT, low-latency systems, AI systems, design patterns, interview questions, book summaries, conference notes and YouTube series.",
  keywords: [
    "C++ interview preparation",
    "C++ roadmap for college students",
    "EDA software engineer roadmap",
    "EDA interview preparation",
    "semiconductor software engineer",
    "VLSI CAD software",
    "HFT interview preparation",
    "HFT internship preparation",
    "AI systems interview",
    "low latency C++",
    "modern C++",
    "C++ design patterns",
    "C++ multithreading",
    "systems design",
    "trading systems",
    "cppvalley",
    "C++ book summaries",
    "C++ conference notes",
  ],
  authors: [{ name: "cppvalley", url: "https://www.youtube.com/@cppvalley" }],
  creator: "cppvalley",
  openGraph: {
    title: "cppvalley — C++, EDA, HFT & AI Systems Interview Prep",
    description:
      "A modular learning hub for C++, EDA software, HFT, low-latency systems, AI systems, interview questions, book summaries, conference notes and YouTube learning series.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/cppvalley-logo.webp", width: 1200, height: 593, alt: "cppvalley logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — C++, EDA, HFT & AI Systems Interview Prep",
    description: "C++, EDA, HFT, low-latency systems and AI systems interview preparation.",
    images: ["/cppvalley-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{logoFitCss}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
