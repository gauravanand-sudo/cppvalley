import Link from "next/link";
import { ContentMeta } from "@/lib/content";

const badgeColor = {
  free: "bg-green-100 text-green-800",
  premium: "bg-purple-100 text-purple-800",
  paid: "bg-orange-100 text-orange-800",
};

export default function ContentCard({ item }: { item: ContentMeta }) {
  return (
    <div className="rounded-xl border p-5 hover:shadow-sm transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          <Link href={`/${item.section}/${item.slug}`}>{item.title}</Link>
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded ${
            badgeColor[item.access] ?? badgeColor.free
          }`}
        >
          {item.access.toUpperCase()}
        </span>
      </div>

      {item.description && (
        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="
                text-xs
                bg-gray-200 text-gray-900
                dark:bg-gray-800 dark:text-gray-100
                px-2 py-1 rounded
              "
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

