import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SpecialtyLabsCatalog } from "@/components/SpecialtyLabsCatalog";
export const metadata:Metadata={
  title:"CUDA, GPU & AI Systems Practice Labs",
  description:"Course-linked GPU/CUDA, inference, distributed AI, RAG and architecture practice outlines. Not yet executable in the C++ judge.",
  alternates:{canonical:"/practice-labs"},
  robots:{index:false,follow:true},
};
export default function PracticeLabsPage() {
  return <><SiteHeader/><main className="cv-subpage"><SpecialtyLabsCatalog/></main><SiteFooter/></>;
}
