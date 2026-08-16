import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marketplace.css";
import "./logo-theme.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  title: {
    default: "cppvalley — HFT Core Systems",
    template: "%s · cppvalley",
  },
  description:
    "Advanced HFT engineering course for building low-latency systems, portfolio evidence, and interview readiness for HFT roles.",
  keywords: [
    "HFT course",
    "HFT engineering",
    "HFT interview preparation",
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
      "Build low-latency systems, portfolio evidence, and interview readiness for HFT engineering roles.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/cppvalley-logo.webp", width: 1200, height: 593, alt: "cppvalley logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — HFT Core Systems",
    description: "Build HFT systems. Prepare for the job.",
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
  themeColor: "#94959a",
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
