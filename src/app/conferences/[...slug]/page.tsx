import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MdxRenderer from "@/components/MdxRenderer";
import { requireContent } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";
import OnThisPage from "@/components/OnThisPage";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function ConferenceSlugPage({ params }: PageProps) {
  const resolvedParams = await params;

  if (!resolvedParams.slug || resolvedParams.slug.length === 0) {
    notFound();
  }

  const slugPath = resolvedParams.slug.join("/");
  const { meta, content } = requireContent("conferences", slugPath);

  return (
    <>
      <SiteHeader />

      <main className="relative bg-white text-gray-900">
        {/* abstract background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-start gap-10">
            {/* main */}
            <div className="min-w-0 flex-1">
              <Link
                href="/conferences"
                className="inline-flex items-center gap-1 text-sm font-mono text-cyan-600 hover:text-cyan-700"
              >
                ← conferences
              </Link>

              <header className="mt-6 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-6">
                <h1 className="text-3xl font-bold tracking-tight">{meta.title}</h1>

                {meta.description && (
                  <p className="mt-3 max-w-2xl text-gray-600 leading-relaxed">
                    {meta.description}
                  </p>
                )}

                {(meta.date || meta.tags?.length) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {meta.date && (
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
                        {meta.date}
                      </span>
                    )}
                    {meta.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-mono text-cyan-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* content */}
              <article
                id="mdx-article"
                className="mt-10 prose prose-slate prose-headings:font-semibold prose-headings:tracking-tight
                           prose-code:font-mono prose-code:text-cyan-700 prose-code:bg-cyan-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md
                           prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-800
                           max-w-none"
              >
                <MdxRenderer source={content} />
              </article>

              <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-6">
                <Link
                  href="/conferences"
                  className="text-sm font-mono text-gray-500 hover:text-gray-700"
                >
                  ← All conferences
                </Link>

                <span className="text-sm font-mono text-gray-400">
                  cppvalley · systems-first
                </span>
              </div>
            </div>

            {/* toc */}
            <OnThisPage containerId="mdx-article" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
