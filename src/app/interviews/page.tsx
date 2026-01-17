import { listContent } from "@/lib/content";
import ContentCard from "@/components/ContentCard";

export default function InterviewsPage() {
  const posts = listContent("interviews");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Interview Experiences</h1>
      <p className="mt-2 text-gray-600">
        Real interview experiences from EDA, HFT, and systems roles.
      </p>

      <div className="mt-8 grid gap-6">
        {posts.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </main>
  );
}

