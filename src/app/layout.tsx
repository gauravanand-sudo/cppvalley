import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marketplace.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  title: {
    default: "cppvalley — C++ & HFT Engineering",
    template: "%s · cppvalley",
  },
  description:
    "Learn modern C++, low-latency systems, Linux, networking and electronic trading through 96 focused lessons, hands-on labs and portfolio projects.",
  keywords: [
    "C++ courses",
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
    title: "cppvalley — C++ to HFT Core Systems",
    description:
      "A systems-first learning platform for modern C++, low latency, Linux, networking and electronic trading.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/cppvalley-logo.webp", width: 1200, height: 593, alt: "cppvalley logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — C++ & HFT Engineering",
    description: "Watch it. Build it. Prove it.",
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
