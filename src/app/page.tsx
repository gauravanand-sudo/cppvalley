import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import RegularPageLayout from "@/components/RegularPageLayout";
import { listContent } from "@/lib/content";
 
const COURSE_STEPS = [
  {
    title: "C++ Interview Course",
    blurb: "Core interview depth",
    href: "/learn/tracks/core-cpp-for-interviews",
    accent: "#9B1C3A",
  },
  {
    title: "Design Patterns",
    blurb: "In-depth practical LLD",
    href: "/learn/tracks/design-pattern-mastery-eda",
    accent: "#7A4A12",
  },
  {
    title: "Multithreading",
    blurb: "Concurrency in depth",
    href: "/learn/tracks/core-cpp-for-interviews/atomics",
    accent: "#1C5E4A",
  },
  {
    title: "Low Latency",
    blurb: "Performance systems prep",
    href: "/learn/tracks/low-latency-and-systems",
    accent: "#275D7A",
  },
  {
    title: "Relevant HLD",
    blurb: "System design depth",
    href: "/learn/tracks/low-latency-and-systems",
    accent: "#5E3D88",
  },
];

const ROADMAPS = [
  {
    company: "Adobe",
    href: "/roadmaps/adobe-cpp-roadmap.pdf",
  },
  {
    company: "Synopsys",
    href: "/roadmaps/synopsys-cpp-roadmap.pdf",
  },
  {
    company: "Siemens",
    href: "/roadmaps/siemens-cpp-roadmap.pdf",
  },
  {
    company: "Cadence",
    href: "/roadmaps/cadence-cpp-roadmap.pdf",
  },
  {
    company: "Ansys",
    href: "/roadmaps/ansys-cpp-roadmap.pdf",
  },
  {
    company: "Qualcomm",
    href: "/roadmaps/qualcomm-cpp-roadmap.pdf",
  },
  {
    company: "Texas Instruments",
    href: "/roadmaps/ti-cpp-roadmap.pdf",
  },
  {
    company: "HFT",
    href: "/roadmaps/hft-cpp-roadmap.pdf",
  },
  {
    company: "NVIDIA",
    href: "/roadmaps/nvidia-cpp-roadmap.pdf",
  },
  {
    company: "Samsung",
    href: "/roadmaps/samsung-cpp-roadmap.pdf",
  },
  {
    company: "ARM",
    href: "/roadmaps/arm-cpp-roadmap.pdf",
  },
  {
    company: "AMD",
    href: "/roadmaps/amd-cpp-roadmap.pdf",
  },
  {
    company: "AI Engineer",
    href: "/roadmaps/ai-engineer-roadmap.pdf",
  },
];

export default async function HomePage() {
  const blogPosts = listContent("blog").slice(0, 3);
  const interviewPosts = listContent("interviews").slice(0, 3);

  return (
    <RegularPageLayout>
      <div className="bg-[#f6f2ee] text-[#171216]">
        <section className="relative overflow-hidden border-b border-[#eadfe3] bg-[radial-gradient(circle_at_top_left,_rgba(155,28,58,0.08),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(69,109,122,0.1),_transparent_26%),linear-gradient(180deg,#fffdfc_0%,#f6f2ee_100%)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(67,44,53,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(67,44,53,0.6) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden">
            <div className="absolute bottom-0 left-[-8%] h-24 w-[42%] rounded-t-[100%] bg-[#d6e3d8]/90 blur-[2px]" />
            <div className="absolute bottom-0 left-[18%] h-32 w-[38%] rounded-t-[100%] bg-[#c3d3c7]/95 blur-[1px]" />
            <div className="absolute bottom-0 left-[45%] h-20 w-[34%] rounded-t-[100%] bg-[#e4ddd7]/90" />
            <div className="absolute bottom-0 right-[-6%] h-28 w-[40%] rounded-t-[100%] bg-[#bfd0c4]/95 blur-[1px]" />
            <div className="absolute bottom-0 inset-x-0 h-12 bg-[linear-gradient(180deg,rgba(246,242,238,0),rgba(246,242,238,0.97))]" />
          </div>
          <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9c7180]">
                  Courses
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#181216] sm:text-4xl">
                  C++ to systems depth
                </h1>
              </div>
              <Link
                href="#roadmaps"
                className="hidden text-sm font-semibold text-[#7F1730] transition hover:opacity-70 sm:inline-flex"
              >
                Roadmaps
              </Link>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">
              {COURSE_STEPS.map((course, index) => (
                <div key={course.title} className="contents">
                  <Link
                    href={course.href}
                    className="group relative overflow-hidden rounded-[1.4rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68))] px-5 py-5 shadow-[0_20px_50px_rgba(37,21,28,0.07)] ring-1 ring-[#f3ebee] backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(37,21,28,0.11)]"
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px] opacity-70"
                      style={{ backgroundColor: course.accent }}
                    />
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-40 blur-2xl" style={{ backgroundColor: course.accent }} />
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="h-10 w-10 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
                        style={{ backgroundColor: course.accent }}
                      >
                        <span className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-white">
                          0{index + 1}
                        </span>
                      </div>
                      <div className="rounded-full border border-[#f0e5ea] bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9B6070] backdrop-blur">
                        Course
                      </div>
                    </div>
                    <div className="mt-5 text-[16px] font-semibold leading-5 tracking-[-0.02em] text-[#1E1518]">
                      {course.title}
                    </div>
                    <div className="mt-2 text-[13px] leading-6 text-[#75636b]">
                      {course.blurb}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-[#fbf3f6] px-3 py-1.5 text-sm font-semibold text-[#7F1730] transition group-hover:bg-[#f8ecf0]">
                      Start course
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                  {index < COURSE_STEPS.length - 1 ? (
                    <div className="hidden items-center justify-center text-[#cfbcc3] lg:flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/75 ring-1 ring-[#efe5e8] backdrop-blur">
                        <MoveRight className="h-4 w-4" />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="roadmaps"
          className="relative overflow-hidden border-y border-[#E8DDE1] bg-[radial-gradient(circle_at_top_right,_rgba(94,61,136,0.08),_transparent_24%),linear-gradient(180deg,#fffefe_0%,#fbf7f8_100%)]"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(110,78,91,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(110,78,91,0.45) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
          <div className="mx-auto max-w-6xl px-5 py-9">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A17380]">Roadmaps</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#171216]">
                Company-specific PDF roadmaps.
              </h2>
              </div>
              <Link
                href="/blog"
                className="hidden text-sm font-semibold text-[#7F1730] transition hover:opacity-70 sm:inline-flex"
              >
                Blog
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
              {ROADMAPS.map((roadmap, index) => (
                <Link
                  key={roadmap.company}
                  href={roadmap.href}
                  className="group relative overflow-hidden rounded-[0.8rem] border border-white/70 px-2.5 py-2 shadow-[0_6px_16px_rgba(37,21,28,0.035)] ring-1 ring-white/40 transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(37,21,28,0.06)]"
                  style={{
                    background: `linear-gradient(180deg, color-mix(in srgb, ${COURSE_STEPS[index % COURSE_STEPS.length]?.accent ?? "#9B1C3A"} 14%, white) 0%, rgba(255,255,255,0.92) 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] opacity-60"
                    style={{ backgroundColor: COURSE_STEPS[index % COURSE_STEPS.length]?.accent ?? "#9B1C3A" }}
                  />
                  <div
                    className="absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-40 blur-2xl"
                    style={{ backgroundColor: COURSE_STEPS[index % COURSE_STEPS.length]?.accent ?? "#9B1C3A" }}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 text-[10px] font-semibold leading-3 tracking-[-0.01em] text-[#1E1518]">
                      {roadmap.company}
                    </div>
                    <div className="inline-flex shrink-0 items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#7F1730] transition group-hover:gap-1.5">
                      Open
                      <ArrowRight className="h-2.5 w-2.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-[#E8DDE1] bg-[radial-gradient(circle_at_top_left,_rgba(39,93,122,0.08),_transparent_24%),linear-gradient(180deg,#f8f4f1_0%,#f3eeea_100%)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0))]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden">
            <div className="absolute bottom-0 left-[-5%] h-16 w-[32%] rounded-t-[100%] bg-[#d7e2e4]/90" />
            <div className="absolute bottom-0 left-[28%] h-20 w-[26%] rounded-t-[100%] bg-[#e3dcd5]/95" />
            <div className="absolute bottom-0 right-[-5%] h-18 w-[36%] rounded-t-[100%] bg-[#cfd9dd]/90" />
          </div>
          <div className="mx-auto max-w-6xl px-5 py-10">
            <div className="mb-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7b8795]">Blog</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#171216]">
                Notes for sharper C++ interviews.
              </h2>
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative overflow-hidden rounded-[1.15rem] border border-[#e6e2df] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68))] p-4 shadow-[0_12px_30px_rgba(37,21,28,0.04)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(37,21,28,0.06)]"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] opacity-60"
                    style={{ backgroundColor: COURSE_STEPS[index % COURSE_STEPS.length]?.accent ?? "#275D7A" }}
                  />
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#dce7ee]/60 blur-2xl" />
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8895a2]">
                    Blog
                  </div>
                  <div className="mt-3 text-base font-semibold leading-6 tracking-[-0.02em] text-[#1E1518]">
                    {post.title}
                  </div>
                  {post.description ? (
                    <p className="mt-2 text-sm leading-6 text-[#6D5860]">
                      {post.description}
                    </p>
                  ) : null}
                  <div className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#275D7A] transition group-hover:gap-1.5">
                    Read
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-[#E8DDE1] bg-[radial-gradient(circle_at_top_right,_rgba(28,94,74,0.1),_transparent_24%),linear-gradient(180deg,#f7faf8_0%,#eef4f1_100%)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0))]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden">
            <div className="absolute bottom-0 left-[-6%] h-16 w-[34%] rounded-t-[100%] bg-[#d8e9e0]/90" />
            <div className="absolute bottom-0 left-[32%] h-18 w-[30%] rounded-t-[100%] bg-[#cfe2d7]/95" />
            <div className="absolute bottom-0 right-[-4%] h-14 w-[30%] rounded-t-[100%] bg-[#dfe7de]/90" />
          </div>
          <div className="mx-auto max-w-6xl px-5 py-10">
            <div className="mb-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#628172]">Interview Experiences</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#171216]">
                Real interview experiences.
              </h2>
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              {interviewPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/interviews/${post.slug}`}
                  className="group relative overflow-hidden rounded-[1.15rem] border border-[#dde8e1] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.7))] p-4 shadow-[0_12px_30px_rgba(21,37,28,0.04)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(21,37,28,0.06)]"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] opacity-60"
                    style={{ backgroundColor: COURSE_STEPS[index % COURSE_STEPS.length]?.accent ?? "#1C5E4A" }}
                  />
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#d8ede4]/60 blur-2xl" />
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b8f7f]">
                    Interview
                  </div>
                  <div className="mt-3 text-base font-semibold leading-6 tracking-[-0.02em] text-[#1E1518]">
                    {post.title}
                  </div>
                  {post.description ? (
                    <p className="mt-2 text-sm leading-6 text-[#5f6a64]">
                      {post.description}
                    </p>
                  ) : null}
                  <div className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#1C5E4A] transition group-hover:gap-1.5">
                    Read experience
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </RegularPageLayout>
  );
}
