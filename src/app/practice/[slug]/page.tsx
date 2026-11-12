import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { PracticeWorkspace } from "@/components/PracticeWorkspace";
import { practiceProblems, getPracticeProblem } from "@/data/practice";

export function generateStaticParams() {
  return practiceProblems.map(problem => ({ slug: problem.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const problem = getPracticeProblem(slug);
  if (!problem) return { title: "Problem not found" };
  return {
    title: problem.title + " | CppValley Practice",
    description: problem.summary,
    alternates: { canonical: "/practice/" + slug },
  };
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getPracticeProblem(slug);
  if (!problem) notFound();
  return (
    <>
      <SiteHeader />
      <main className="pv-workspace-main">
        <PracticeWorkspace problem={problem} />
      </main>
    </>
  );
}
