import { listContent } from "@/lib/content";
import ContentCard from "@/components/ContentCard";

export default function LearnPage() {
  const lessons = listContent("learn");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Learn</h1>
      <p className="mt-2 text-gray-600">
        Structured C++ systems lessons for elite interviews.
      </p>

      <div className="mt-8 grid gap-6">
        {lessons.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </main>
  );
}

