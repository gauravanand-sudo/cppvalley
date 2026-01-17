import MdxRenderer from "@/components/MdxRenderer";
import { requireContent } from "@/lib/content";

export default async function ConferenceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = requireContent("conferences", slug);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      {meta.description && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {meta.description}
        </p>
      )}

      <div className="mt-8">
        <MdxRenderer source={content} />
      </div>
    </main>
  );
}

