import Link from "next/link";
import { listTracks } from "@/lib/content";

export default function TracksIndexPage() {
  const tracks = listTracks();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Tracks</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Grokking-style guided tracks (some lessons free, some premium/paid).
      </p>

      <div className="mt-8 grid gap-6">
        {tracks.map((t) => (
          <div key={t.slug} className="rounded-xl border p-5 hover:shadow-sm transition">
            <h2 className="text-xl font-semibold">
              <Link className="hover:underline" href={`/learn/tracks/${t.slug}`}>
                {t.title}
              </Link>
            </h2>
            {t.description && <p className="mt-2 text-gray-600 dark:text-gray-300">{t.description}</p>}
            <div className="mt-3 flex gap-2 text-sm">
              {t.duration && <span className="rounded bg-gray-200 dark:bg-gray-800 px-2 py-1">{t.duration}</span>}
              {t.level && <span className="rounded bg-gray-200 dark:bg-gray-800 px-2 py-1">{t.level}</span>}
              <span className="rounded bg-black text-white px-2 py-1">{t.access.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

