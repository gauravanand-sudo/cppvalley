import RegularPageLayout from "@/components/RegularPageLayout";
import Image from "next/image";
import Link from "next/link";
import { listTracks } from "@/lib/content";
import { getUserEntitlements } from "@/lib/entitlements";
import { hasTrackAccess, trackRequiresPurchase } from "@/lib/trackAccess";
import { ArrowRight, Clock3, PlayCircle, Sparkles } from "lucide-react";

type TrackLike = {
  slug: string;
  title: string;
  description?: string;
  duration?: string;
  live?: boolean;
  access?: "free" | "paid" | string;
  price?: number | string | null;
  priceLabel?: string | null;
  thumbnail?: string | null;
  thumbnailTitle?: string | null;
  cardMeta?: string[] | null;
  badge?: string | null;
  level?: string | null;
};

function getAccessLabel(track: TrackLike) {
  const access = (track.access ?? "free").toLowerCase();

  if (access === "paid") {
    if (track.priceLabel && String(track.priceLabel).trim()) return String(track.priceLabel);
    if (typeof track.price === "number") return `₹${track.price}`;
    if (typeof track.price === "string" && track.price.trim()) return track.price;
    return "Paid";
  }

  return "Free";
}

function getBadgeLabel(track: TrackLike, unlocked: boolean, requiresPurchase: boolean) {
  if (requiresPurchase) return unlocked ? "Enrolled" : "Paid";
  if (track.badge && track.badge.trim()) return track.badge;
  return "Free";
}

function getCardMeta(track: TrackLike) {
  if (Array.isArray(track.cardMeta) && track.cardMeta.length > 0) return track.cardMeta.slice(0, 2);
  return [track.duration, track.level].filter((value): value is string => Boolean(value));
}

export default async function HomePage() {
  const entitlements = await getUserEntitlements();

  const allTracks = (listTracks() as TrackLike[]).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <RegularPageLayout>
      <main className="bg-[#130F12] text-[#F6EDF0]">
        <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[radial-gradient(circle_at_top_left,#4A1F2C_0%,#181215_42%,#130F12_100%)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-6rem] top-[-5rem] h-72 w-72 rounded-full bg-[#D46886]/18 blur-3xl" />
            <div className="absolute bottom-[-4rem] right-[-3rem] h-80 w-80 rounded-full bg-[#7B3148]/30 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl gap-4 px-3 py-3 md:grid-cols-[0.88fr_1.12fr] md:overflow-hidden md:px-4 lg:px-6 lg:py-4">
            <div className="flex min-h-0 flex-col justify-center rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur md:p-6 lg:p-8">
              <div className="max-w-xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#E8CED6]">
                  <Sparkles className="h-3.5 w-3.5 text-[#D46886]" />
                  structured · exhaustive · targeted
                </div>

                <h1 className="text-3xl font-semibold leading-[1] tracking-tight text-white sm:text-4xl lg:text-[3.15rem]">
                  Structured, exhaustive, targeted C++ preparation, all at one place for interviews.
                </h1>

                <p className="mt-4 max-w-lg text-[13px] leading-6 text-[#CFB8C0] sm:text-sm sm:leading-7">
                  Zero to architect level, with advanced C++ across <span className="font-semibold text-white">low latency</span>,{" "}
                  <span className="font-semibold text-white">template metaprogramming</span>,{" "}
                  <span className="font-semibold text-white">allocators</span>,{" "}
                  <span className="font-semibold text-white">lock-free data structures</span>,{" "}
                  <span className="font-semibold text-white">memory ordering</span>,{" "}
                  <span className="font-semibold text-white">NUMA</span>,{" "}
                  <span className="font-semibold text-white">cache locality</span>,{" "}
                  <span className="font-semibold text-white">SIMD</span>,{" "}
                  <span className="font-semibold text-white">GPU execution models</span>,{" "}
                  <span className="font-semibold text-white">compilers</span>,{" "}
                  <span className="font-semibold text-white">runtimes</span>,{" "}
                  <span className="font-semibold text-white">kernels</span>,{" "}
                  <span className="font-semibold text-white">HPC</span>, and{" "}
                  <span className="font-semibold text-white">performance-critical systems</span>.
                </p>

                <p className="mt-3 max-w-lg text-[12px] leading-6 text-[#B996A2] sm:text-[13px]">
                  Built for interviews spanning <span className="font-semibold text-[#F2C8D5]">HFT</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">market data</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">matching engines</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">distributed systems</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">storage</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">networking</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">embedded systems</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">databases</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">browsers</span>,{" "}
                  <span className="font-semibold text-[#F2C8D5]">GPU stacks</span>, and{" "}
                  <span className="font-semibold text-[#F2C8D5]">cloud infrastructure</span> at places like{" "}
                  <span className="font-semibold text-white">NVIDIA</span>,{" "}
                  <span className="font-semibold text-white">AMD</span>,{" "}
                  <span className="font-semibold text-white">Apple</span>,{" "}
                  <span className="font-semibold text-white">Google</span>,{" "}
                  <span className="font-semibold text-white">Meta</span>,{" "}
                  <span className="font-semibold text-white">Microsoft</span>,{" "}
                  <span className="font-semibold text-white">Adobe</span>,{" "}
                  <span className="font-semibold text-white">Synopsys</span>,{" "}
                  <span className="font-semibold text-white">Siemens</span>,{" "}
                  <span className="font-semibold text-white">VMware</span>,{" "}
                  <span className="font-semibold text-white">Bloomberg</span>,{" "}
                  <span className="font-semibold text-white">Jane Street</span>,{" "}
                  <span className="font-semibold text-white">Citadel</span>,{" "}
                  <span className="font-semibold text-white">Jump Trading</span>,{" "}
                  <span className="font-semibold text-white">Tower Research</span>,{" "}
                  <span className="font-semibold text-white">Optiver</span>,{" "}
                  <span className="font-semibold text-white">IMC</span>,{" "}
                  <span className="font-semibold text-white">Qualcomm</span>,{" "}
                  <span className="font-semibold text-white">Intel</span>,{" "}
                  <span className="font-semibold text-white">Arm</span>, and{" "}
                  <span className="font-semibold text-white">Cloudflare</span>.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/learn/tracks"
                    className="inline-flex items-center gap-2 rounded-full bg-[#9B1C3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#861733]"
                  >
                    Explore advanced courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 flex-col rounded-[1.7rem] border border-white/10 bg-[#171216]/85 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur md:p-4">
              <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B996A2]">
                    Courses
                  </div>
                  <div className="mt-1 text-base font-semibold text-white sm:text-lg">
                    All courses
                  </div>
                </div>
                <Link href="/learn/tracks" className="text-xs font-semibold text-[#D46886] hover:underline sm:text-sm">
                  Open catalog
                </Link>
              </div>

              <div className="grid content-start gap-3 md:max-h-[calc(100vh-150px)] md:overflow-y-auto md:pr-1">
                {allTracks.map((track) => {
                  const isLive = track.live !== false;
                  const cardMeta = getCardMeta(track);
                  const requiresPurchase = trackRequiresPurchase({
                    access: (track.access ?? "free") as "free" | "paid" | "premium",
                    price: typeof track.price === "number" ? track.price : undefined,
                  });
                  const unlocked = hasTrackAccess(entitlements, {
                    slug: track.slug,
                    access: (track.access ?? "free") as "free" | "paid" | "premium",
                    price: typeof track.price === "number" ? track.price : undefined,
                  });
                  const badgeLabel = isLive ? getBadgeLabel(track, unlocked, requiresPurchase) : "Soon";
                  const actionHref = unlocked
                    ? `/learn/tracks/${track.slug}`
                    : `/checkout?track=${encodeURIComponent(track.slug)}`;

                  return (
                    <article
                      key={track.slug}
                      className={`grid overflow-hidden rounded-[1.3rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] sm:grid-cols-[190px_1fr] ${isLive ? "transition hover:border-white/20 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))]" : "opacity-75"}`}
                    >
                      <div className="relative min-h-[130px] bg-[linear-gradient(135deg,#2A1E24,#161114)]">
                        {track.thumbnail ? (
                          <Image src={track.thumbnail} alt={track.title} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <div className="rounded-full bg-[#9B1C3A] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                              cppvalley
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col p-4">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-white sm:text-[15px]">
                            {track.title}
                          </h2>
                          <span className="shrink-0 rounded-full border border-[#D46886]/25 bg-[#D46886]/12 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#F2C8D5]">
                            {badgeLabel}
                          </span>
                        </div>

                        <p className="mb-3 line-clamp-2 text-[11px] leading-5 text-[#CCB5BC] sm:text-xs">
                          {track.description ?? ""}
                        </p>

                        <div className="mb-3 flex flex-wrap gap-2 text-[10px] text-[#BA9CA5]">
                          {cardMeta.map((item, index) => {
                            const Icon = index === 0 ? PlayCircle : Clock3;
                            return (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1"
                              >
                                <Icon className="h-3.5 w-3.5 text-[#D46886]" />
                                {item}
                              </span>
                            );
                          })}
                        </div>

                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                          <div className="text-sm font-semibold text-white">
                            {isLive ? getAccessLabel(track) : "Launching soon"}
                          </div>
                          {isLive ? (
                            <Link
                              href={actionHref}
                              className="inline-flex items-center gap-1 rounded-full bg-[#9B1C3A] px-3.5 py-2 text-[10px] font-bold text-white transition hover:bg-[#861733]"
                            >
                              {unlocked ? "Open" : requiresPurchase ? "Buy" : "Start"}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wide text-[#D6BBC4]">
                              Launching soon
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </RegularPageLayout>
  );
}
