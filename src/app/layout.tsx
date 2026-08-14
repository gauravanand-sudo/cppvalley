import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cppvalley.com"),
  title: {
    default: "cppvalley — HFT Core Systems",
    template: "%s · cppvalley",
  },
  description:
    "Build low-latency C++, Linux, networking, and electronic-trading systems through 96 evidence-driven episodes and four flagship projects.",
  keywords: [
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
    title: "cppvalley — From cache line to executed order",
    description:
      "A public engineering lab for low-latency C++, market data, exchange connectivity, and HFT systems.",
    url: "https://cppvalley.com",
    siteName: "cppvalley",
    type: "website",
    images: [{ url: "/cppvalley-logo.png", width: 1025, height: 1024, alt: "cppvalley logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "cppvalley — HFT Core Systems",
    description: "Build, break, measure, and defend low-latency trading infrastructure.",
    images: ["/cppvalley-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/cppvalley-logo.png",
    shortcut: "/cppvalley-logo.png",
    apple: "/cppvalley-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f5",
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
