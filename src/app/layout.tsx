import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marketplace.css";
import "./institute.css";

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
  themeColor: "#f5f5f2",
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
