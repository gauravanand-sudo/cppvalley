import MdxRenderer from "@/components/MdxRenderer";
import { requireContent } from "@/lib/content";

export default async function LearnSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ unwrap params (Next.js 14 requirement)
  const { slug } = await params;

  const { meta, content } = requireContent("learn", slug);

  const locked = meta.access === "premium" || meta.access === "paid";

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">{meta.title}</h1>

      {locked ? (
        <div className="mt-6 rounded-xl border p-6">
          <p className="font-medium">
            This is <b>{meta.access}</b> content.
          </p>

          <div className="mt-4">
            <MdxRenderer source={content.slice(0, 600)} />
          </div>

          <a
            href="/pricing"
            className="inline-block mt-4 rounded-lg bg-black px-4 py-2 text-white"
          >
            Unlock full content
          </a>
        </div>
      ) : (
        <div className="mt-6">
          <MdxRenderer source={content} />
        </div>
      )}
    </main>
  );
}

