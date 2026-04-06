import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import RouteLoadingProvider from "@/components/RouteLoadingProvider";

export const metadata: Metadata = {
  title: "cppvalley",
  description: "EDA • HFT • Low Latency • Systems interview mastery",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <AuthProvider>
          <RouteLoadingProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
