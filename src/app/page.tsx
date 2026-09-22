import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "cppvalley — C++, HFT & AI Systems Interview Prep",
  description:
    "A CMU-inspired learning hub for C++, HFT, low-latency systems, AI systems, interview preparation, book summaries, conference notes and cppvalley YouTube series.",
  alternates: { canonical: "/" },
};

const tracks = [
  {
    tag: "Free course",
    title: "Core C++ for Interviews",
    text: "Modern C++, RAII, smart pointers, move semantics, STL, object model, UB, tooling and build-from-scratch projects.",
    href: "/courses#core-cpp",
    items: ["Scott Meyers spine", "Effective STL coverage", "Zero to senior C++"],
  },
  {
    tag: "Roadmap live",
    title: "HFT Core Systems",
    text: "CPU, memory, Linux, networking, latency, market data, execution, risk, tick-to-trade and HFT interviews.",
    href: "/curriculum",
    items: ["96 lesson curriculum", "Low-latency labs", "Trading systems"],
  },
  {
    tag: "Coming next",
    title: "C++ Design Patterns + LLD",
    text: "Design patterns, SOLID, clean C++ architecture, Klaus/Fedor-style design thinking and interview-grade LLD problems.",
    href: "/courses#lld",
    items: ["Patterns in modern C++", "LLD rounds", "Architecture trade-offs"],
  },
  {
    tag: "Coming next",
    title: "Multithreading in C++",
    text: "Threads, mutexes, condition variables, futures, atomics, memory ordering, thread pools and concurrent data structures.",
    href: "/courses#concurrency",
    items: ["Anthony Williams spine", "Thread-safe builds", "Race/deadlock debugging"],
  },
  {
    tag: "Coming next",
    title: "AI Systems Engineering",
    text: "Inference systems, vector databases, RAG, model serving, batching, evaluation, agents and production AI architecture.",
    href: "/courses#ai-systems",
    items: ["RAG systems", "Serving + evals", "AI infra interviews"],
  },
  {
    tag: "Research lab",
    title: "Compiler + Performance Labs",
    text: "Compilers, profiling, benchmarking, cache behavior, allocators, parsers and high-performance systems projects.",
    href: "/projects",
    items: ["Deep systems projects", "Portfolio proof", "Engineering writeups"],
  },
] as const;

const hubs = [
  {
    title: "Daily engineering blog",
    text: "Short daily notes on C++, HFT systems, AI systems, interview traps, debugging, performance and career strategy.",
    href: "/blog",
    tag: "Daily traffic",
  },
  {
    title: "Interview experiences + questions",
    text: "Company-style question banks, round breakdowns, C++/LLD/HLD prompts, HFT preparation and answer frameworks.",
    href: "/interviews",
    tag: "SEO library",
  },
  {
    title: "C++ conference notes",
    text: "CppCon, C++Now, Meeting C++, ACCU and performance-talk summaries rewritten as practical interview lessons.",
    href: "/conferences",
    tag: "Authority content",
  },
  {
    title: "Book summaries",
    text: "Interview-focused summaries of Effective Modern C++, Effective STL, C++ Concurrency in Action, DDIA and more.",
    href: "/books",
    tag: "Evergreen SEO",
  },
  {
    title: "cppvalley YouTube series",
    text: "Embed slots for @cppvalley playlists so videos can play inside the site once the playlist/video IDs are added.",
    href: "/youtube",
    tag: "Video hub",
  },
  {
    title: "Course placeholders",
    text: "A modular course catalog that can start free, build traffic, and later support paid cohorts, ads or sponsorships.",
    href: "/courses",
    tag: "Monetization later",
  },
] as const;

const roadmap = [
  ["01", "Learn Core C++", "Fundamentals, RAII, move semantics, templates, STL and performance-aware C++."],
  ["02", "Build systems proof", "Vector, smart pointers, cache, memory pool, benchmark harness and tooling labs."],
  ["03", "Specialize", "Choose HFT, AI systems, LLD/design patterns, concurrency or compiler/performance projects."],
  ["04", "Prepare interviews", "Use question banks, round breakdowns, mock prompts and real explanation scripts."],
  ["05", "Publish proof", "Turn projects, notes and videos into portfolio evidence and long-term SEO traffic."],
] as const;

export default function Home() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />

      <main>
        <section className="platform-hero site-container">
          <div>
            <p className="platform-kicker">C++ · HFT · AI Systems · Interviews</p>
            <h1>
              A one-stop systems interview campus for <span>serious C++ engineers.</span>
            </h1>
            <p className="platform-lede">
              cppvalley is being rebuilt into a modular learning platform for anyone preparing for
              C++, HFT, low-latency systems or AI systems roles: free courses first, daily writing,
              interview questions, book notes, conference summaries and embedded @cppvalley videos.
            </p>
            <div className="platform-actions">
              <Link className="platform-button primary" href="/courses">
                Explore courses
              </Link>
              <Link className="platform-button" href="/blog">
                Read daily blog
              </Link>
              <Link className="platform-button ghost" href="/youtube">
                Watch @cppvalley
              </Link>
            </div>
          </div>

          <aside className="platform-hero-card" aria-label="cppvalley platform plan">
            <div className="platform-terminal">
              <div><span>$</span> cppvalley --mission</div>
              <div>build traffic before monetization</div>
              <div>free courses → trust → audience → ads/cohorts</div>
              <div>C++ | HFT | AI systems | interviews</div>
            </div>
            <div className="platform-stats">
              <div><small>Learning model</small><strong>Courses + labs + essays + video</strong></div>
              <div><small>Audience</small><strong>Students, engineers, HFT/AI systems aspirants</strong></div>
              <div><small>Design language</small><strong>Academic, modular, CMU-inspired</strong></div>
              <div><small>Monetization</small><strong>Free now · ads/courses later</strong></div>
            </div>
          </aside>
        </section>

        <section className="platform-section site-container" aria-labelledby="tracks-heading">
          <div className="platform-section-index">01</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">Course architecture</p>
                <h2 id="tracks-heading">Modular tracks, not one giant confusing curriculum.</h2>
                <p>
                  The site now has space for C++, HFT, LLD, concurrency, AI systems and deep systems projects.
                  Courses can stay free while the site builds SEO and brand authority.
                </p>
              </div>
              <Link className="platform-button" href="/courses">Course catalog</Link>
            </div>

            <div className="platform-grid">
              {tracks.map((track) => (
                <Link className="platform-card" href={track.href} key={track.title}>
                  <span className="tag">{track.tag}</span>
                  <h3>{track.title}</h3>
                  <p>{track.text}</p>
                  <ul>
                    {track.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="platform-card-footer"><span>Open module</span><b>↗</b></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section site-container" aria-labelledby="hubs-heading">
          <div className="platform-section-index">02</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">Traffic engines</p>
                <h2 id="hubs-heading">Content hubs built for search, trust and repeat visits.</h2>
                <p>
                  The course catalog is only one piece. Long-term traffic comes from daily posts,
                  interview questions, book summaries, conference notes and YouTube series pages.
                </p>
              </div>
            </div>

            <div className="platform-grid">
              {hubs.map((hub) => (
                <Link className="platform-feature-card" href={hub.href} key={hub.title}>
                  <span className="tag">{hub.tag}</span>
                  <h3>{hub.title}</h3>
                  <p>{hub.text}</p>
                  <div className="platform-card-footer"><span>Explore</span><b>↗</b></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section site-container" aria-labelledby="path-heading">
          <div className="platform-section-index">03</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">Preparation path</p>
                <h2 id="path-heading">From zero to architect-level systems thinking.</h2>
                <p>
                  The learning path is designed like a staircase: start with Core C++, build proof,
                  then specialize into HFT, AI systems, design patterns, concurrency and advanced systems.
                </p>
              </div>
            </div>

            <div className="platform-path">
              {roadmap.map(([number, title, text]) => (
                <div key={number}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </div>
                  <b>→</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section site-container" aria-labelledby="seo-heading">
          <div className="platform-section-index">04</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">SEO + authority</p>
                <h2 id="seo-heading">Built to become the default C++ systems preparation site.</h2>
                <p>
                  Each section is now a future content silo: C++ interview prep, HFT interview prep,
                  AI systems interviews, C++ books, conference notes, YouTube series and daily blog posts.
                </p>
              </div>
            </div>
            <div className="platform-dark-band">
              <h3>Current strategy</h3>
              <p>
                Keep the site useful and free while the audience grows. Add paid courses, sponsorships,
                ads or cohorts later only after cppvalley has strong trust, search traffic and YouTube discovery.
              </p>
              <div className="platform-actions">
                <Link className="platform-button primary" href="/interviews">Interview library</Link>
                <Link className="platform-button" href="/books">Book summaries</Link>
                <Link className="platform-button ghost" href="/conferences">Conference notes</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
