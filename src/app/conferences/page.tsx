import { listContent } from "@/lib/content";
import ContentCard from "@/components/ContentCard";

export default function ConferencesPage() {
  const posts = listContent("conferences");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">C++ Conferences</h1>
      <p className="mt-2 text-gray-600">
        Notes, summaries, and insights from major C++ conferences.
      </p>

      <div className="mt-8 grid gap-6">
        {posts.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </main>
  );
}

