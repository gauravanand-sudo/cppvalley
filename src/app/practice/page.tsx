import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PracticeCatalog } from "@/components/PracticeCatalog";

export const metadata: Metadata = {
  title: "C++ Coding Problems | HFT, Concurrency & Design Patterns",
  description: "Practice original C++ coding challenges in HFT, multithreading, STL, and design patterns on CppValley.",
  alternates: { canonical: "/practice" },
};

export default function PracticeHome() {
  return (
    <>
      <SiteHeader />
      <main className="pv-page"><PracticeCatalog /></main>
      <SiteFooter />
    </>
  );
}
