import MdxRenderer from "@/components/MdxRenderer";
import { requireContent } from "@/lib/content";

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = requireContent("blog", slug);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      {meta.description && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {meta.description}
        </p>
      )}

      {meta.tags && meta.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8">
        <MdxRenderer source={content} />
      </div>
    </main>
  );
}

