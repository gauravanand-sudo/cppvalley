import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marketplace.css";
import "./institute.css";
import "./brand-consistency.css";
import "./cmu.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  title: {
    default: "cppvalley — HFT Core Systems",
    template: "%s · cppvalley",
  },
  description:
    "Learn C++, Linux, networking, concurrency, low latency and trading systems for HFT engineering, with hands-on projects and interview preparation.",
  keywords: [
    "HFT course",
    "C++ systems course",
    "low latency C++",
    "HFT engineering",
    "HFT interview preparation",
    "Linux performance",
    "network programming",
    "lock-free programming",
    "trading systems",
    "market data",
  ],
  authors: [{ name: "cppvalley", url: "https://www.youtube.com/@cppvalley" }],
  creator: "cppvalley",
  openGraph: {
    title: "cppvalley — HFT Core Systems",
    description:
      "Learn C++, systems and low latency for HFT — from CPU and Linux to networking, concurrency and trading systems.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/cppvalley-logo.webp", width: 1200, height: 593, alt: "cppvalley logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — HFT Core Systems",
    description: "Learn C++, systems and low latency for HFT.",
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
