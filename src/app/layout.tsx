import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marketplace.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  title: {
    default: "cppvalley — HFT Core Systems",
    template: "%s · cppvalley",
  },
  description:
    "HFT Core Systems is one advanced engineering course covering modern C++, low latency, Linux, networking, concurrency, market data, risk, and tick-to-trade systems.",
  keywords: [
    "HFT course",
    "HFT engineering",
    "low latency C++",
    "trading systems",
    "market data",
    "lock-free programming",
    "Linux performance",
  ],
  authors: [{ name: "cppvalley", url: "https://www.youtube.com/@cppvalley" }],
  creator: "cppvalley",
  openGraph: {
    title: "cppvalley — HFT Core Systems",
    description:
      "One systems-first course from modern C++ and Linux to market data, risk, and tick-to-trade engineering.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/cppvalley-logo.webp", width: 1200, height: 593, alt: "cppvalley logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — HFT Core Systems",
    description: "One course. One path. C++ to tick-to-trade.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
