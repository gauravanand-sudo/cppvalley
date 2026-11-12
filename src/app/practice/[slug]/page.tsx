import { permanentRedirect } from "next/navigation";
import { practiceProblems } from "@/data/practice";
export function generateStaticParams(){return practiceProblems.map(p=>({slug:p.slug}));}
export default async function LegacyPracticeProblem({params}:{params:Promise<{slug:string}>}){permanentRedirect("/problems/"+(await params).slug);}
