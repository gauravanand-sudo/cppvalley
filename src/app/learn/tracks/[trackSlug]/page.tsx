import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getTrackBySlug, parseTrackSyllabus } from "@/lib/content";

function isTrackLive(live: any) {
  return !(live === false || live === "false" || live === 0 || live === "0");
}

type Access = "free" | "premium" | "paid";

function normalizeAccess(v: any): Access {
  if (v === "free" || v === "premium" || v === "paid") return v;
  return "free";
}

// child access wins; else inherit parent; else free
function effectiveAccess(child: any, parent?: any): Access {
  if (child && child.access) return normalizeAccess(child.access);
  if (parent && parent.access) return normalizeAccess(parent.access);
  return "free";
}

function formatPrice(p?: number) {
  if (!p || p <= 0) return "Free";
  return `₹${p.toLocaleString("en-IN")}`;
}

export default async function TrackIntroPage({
  params,
}: {
  params: Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await params;

  const track = getTrackBySlug(trackSlug);
  if (!track) notFound();

  const live = isTrackLive((track.meta as any).live);
  if (!live) notFound();

  const sections = parseTrackSyllabus(track.content);

  const price =
    typeof (track.meta as any).price === "number" ? (track.meta as any).price : 0;

  // find first FREE lesson from syllabus
  let firstFreeLesson: string | null = null;
  for (const sec of sections as any[]) {
    for (const it of sec.items || []) {
      if (Array.isArray(it.children)) {
        for (const c of it.children) {
          const acc = effectiveAccess(c, it);
          if (acc === "free" && c.slug) {
            firstFreeLesson = c.slug;
            break;
          }
        }
      } else if (it?.slug) {
        const acc = effectiveAccess(it);
        if (acc === "free") firstFreeLesson = it.slug;
      }
      if (firstFreeLesson) break;
    }
    if (firstFreeLesson) break;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <main className="relative bg-white text-gray-900">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
              {(track.meta.access ?? "free").toUpperCase()}
            </span>
            {track.meta.duration ? (
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
                {track.meta.duration}
              </span>
            ) : null}
            {track.meta.level ? (
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
                {track.meta.level}
              </span>
            ) : null}
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
              {formatPrice(price)}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {track.meta.title}
          </h1>

          {track.meta.description ? (
            <p className="mt-3 text-gray-600 leading-relaxed max-w-3xl">
              {track.meta.description}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/learn/tracks"
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              ← Back to Tracks
            </Link>

            {firstFreeLesson ? (
              <Link
                href={`/learn/tracks/${trackSlug}/${firstFreeLesson}`}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
              >
                Start free lessons →
              </Link>
            ) : (
              <Link
                href={`/pricing?track=${encodeURIComponent(trackSlug)}`}
                className="rounded-xl bg-cyan-600 px-5 py-2 text-sm font-semibold text-white hover:bg-cyan-700 transition"
              >
                Purchase Track →
              </Link>
            )}
          </div>

          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Syllabus</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Free lessons open directly. Premium/Paid lessons redirect to pricing.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {sections.map((sec) => (
                <div
                  key={sec.title}
                  className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-6"
                >
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
                    {sec.title}
                  </div>

                  <div className="mt-4 space-y-2">
                    {(sec.items as any[]).map((it, idx) => {
                      if (Array.isArray(it.children)) {
                        return (
                          <div key={it.title + idx} className="mt-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {it.title}
                            </div>

                            <div className="mt-2 grid gap-2">
                              {it.children.map((c: any) => {
                                const acc = effectiveAccess(c, it);
                                const locked = acc !== "free";

                                const href = locked
                                  ? `/pricing?track=${encodeURIComponent(trackSlug)}`
                                  : `/learn/tracks/${trackSlug}/${c.slug}`;

                                return (
                                  <Link
                                    key={c.slug}
                                    href={href}
                                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
                                  >
                                    <div className="min-w-0">
                                      <div className="truncate text-sm text-gray-900">
                                        {c.title}
                                      </div>
                                      <div className="text-xs font-mono text-gray-500">
                                        {c.slug}
                                      </div>
                                    </div>

                                    {locked ? (
                                      <span className="text-xs font-mono text-amber-600">
                                        {acc}
                                      </span>
                                    ) : (
                                      <span className="text-xs font-mono text-emerald-700">
                                        free
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      const acc = effectiveAccess(it);
                      const locked = acc !== "free";
                      const href = locked
                        ? `/pricing?track=${encodeURIComponent(trackSlug)}`
                        : `/learn/tracks/${trackSlug}/${it.slug}`;

                      return (
                        <Link
                          key={it.slug}
                          href={href}
                          className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm text-gray-900">
                              {it.title}
                            </div>
                            <div className="text-xs font-mono text-gray-500">
                              {it.slug}
                            </div>
                          </div>

                          {locked ? (
                            <span className="text-xs font-mono text-amber-600">
                              {acc}
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-emerald-700">
                              free
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 border-t border-gray-200 pt-6 text-sm font-mono text-gray-400">
            cppvalley · track intro · {trackSlug}
          </div>
        </div>
      </main>

    </div>
  );
}
