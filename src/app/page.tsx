import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { CourseCard } from "@/components/CourseCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";
import { courses } from "@/data/courses";
import { heroImages, imageForBlog, imageForCourse } from "@/data/media";
import { youtubeSeries } from "@/data/youtube";

export const metadata: Metadata = {
  title: "cppvalley — Learn C++ systems, one concept at a time",
  description: "Master modern C++, concurrency, Linux, low-latency HFT, EDA, GPU and AI systems through structured learning paths and real engineering notes.",
  alternates: { canonical: "/" },
};

const homeAdSlot = process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT;

const trackCopy: Record<string, string> = {
  "C++ Core": "Language mechanics, ownership, STL, templates and interview-depth C++.",
  Systems: "Linux, networking, latency, concurrency and trading infrastructure.",
  "EDA / CAD": "Graphs, parsers and scalable software for chip-design tooling.",
  "GPU / AI": "GPU programming, inference and AI infrastructure foundations.",
  Roadmap: "A guided route from university foundations to systems roles.",
};

const trackIcon: Record<string, string> = {"C++ Core": "C++", Systems: "01", "EDA / CAD": "EDA", "GPU / AI": "GPU", Roadmap: "↗"};
function shortDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en", {month:"short",day:"numeric",year:"numeric",timeZone:"UTC"});
}

export default function Home() {
  const featured = [...courses].sort((a,b) => a.priority - b.priority).slice(0,6);
  const tracks = Array.from(new Set(courses.map(course => course.pillar)));
  const posts = [...blogPosts].sort((a,b) => b.publishedAt.localeCompare(a.publishedAt));
  const videos = youtubeSeries.reduce((sum, series) => sum + series.videos.length,0);

  return (
    <div>
      <SiteHeader />
      <main className="page-main g-home">
        <section className="g-hero">
          <div className="site-container g-hero-layout">
            <div className="g-hero-copy">
              <div className="g-pill g-pill-light"><span className="g-pill-dot" /> Your C++ systems learning hub</div>
              <h1>Learn the <span>patterns</span> behind powerful C++ systems.</h1>
              <p className="g-hero-lead">Learn beyond syntax. Build a deep mental model of modern C++, concurrency, operating systems, low-latency trading, EDA and GPU infrastructure.</p>
              <div className="g-hero-buttons"><Link href="/courses" className="g-button g-button-primary">Explore all courses <span>→</span></Link><Link href="/blog" className="g-button g-button-outline">Explore engineering notes</Link></div>
              <div className="g-hero-foot"><span className="g-hero-foot-icon">✓</span> Real curriculum outlines <span>·</span> Original video lessons <span>·</span> In-depth articles</div>
            </div>
            <div className="g-hero-visual" aria-label="cppvalley engineering learning illustrations">
              <div className="g-hero-glow" />
              <div className="g-mosaic g-mosaic-main"><img src={heroImages[0]} alt="cppvalley systems learning illustration" /></div>
              <div className="g-mosaic g-mosaic-side-top"><img src={heroImages[1]} alt="Systems engineering illustration" /></div>
              <div className="g-mosaic g-mosaic-side-bottom"><img src={heroImages[2]} alt="Chip design engineering illustration" /></div>
              <div className="g-code-float"><span className="g-code-icon">C++</span><span><strong>Think like a systems engineer</strong><small>Understand the why, not just the API.</small></span></div>
            </div>
          </div>
        </section>

        <section className="g-proof-strip">
          <div className="site-container g-proof-inner">
            <p>Build skills across the full stack</p>
            <div className="g-proof-items">{["Modern C++","Concurrency","Linux & networking","Low-latency HFT","EDA / CAD","GPU & AI"].map(item => <span key={item}><i>◆</i> {item}</span>)}</div>
          </div>
        </section>

        <div className="site-container"><AdSlot slot={homeAdSlot} className="ad-slot-leaderboard" /></div>

        <section className="g-section" id="popular-courses">
          <div className="site-container">
            <div className="g-section-header"><div><p className="g-section-kicker">POPULAR STARTING POINTS</p><h2>Pick a course. <span>Get to the core of it.</span></h2><p>Start with a topic that matters to you and work through the concepts in a deliberate order.</p></div><Link className="g-inline-link" href="/courses">See all {courses.length} courses <span>→</span></Link></div>
            <div className="g-card-grid">{featured.map((course, index) => <CourseCard course={course} featured={index < 2} key={course.slug} />)}</div>
          </div>
        </section>

        <section className="g-section g-section-tinted" id="learning-paths">
          <div className="site-container">
            <div className="g-section-header"><div><p className="g-section-kicker">STRUCTURED LEARNING</p><h2>Find your learning path</h2><p>From the C++ object model to real-world systems and infrastructure, choose the track that matches your goal.</p></div></div>
            <div className="g-path-grid">{tracks.map((track, index) => {
              const item = courses.find(course => course.pillar === track);
              const count = courses.filter(course => course.pillar === track).length;
              return <Link href={"/courses?track=" + encodeURIComponent(track) + "#catalog"} key={track} className={"g-path-card g-path-" + index}>
                <span className="g-path-icon">{trackIcon[track]}</span>
                <h3>{track}</h3><p>{trackCopy[track]}</p>
                <div><span>{count} {count === 1 ? "course" : "courses"}</span><strong>Explore track →</strong></div>
                {item ? <img src={imageForCourse(item.slug, item.pillar)} alt="" loading="lazy" /> : null}
              </Link>;
            })}</div>
          </div>
        </section>

        <section className="g-section g-method">
          <div className="site-container">
            <div className="g-section-header g-section-header-center"><div><p className="g-section-kicker">THE LEARNING APPROACH</p><h2>Go beyond memorizing C++.</h2><p>Clear structure, real technical depth, and a path from knowing the language to understanding the machine.</p></div></div>
            <div className="g-method-grid">
              <div><span className="g-method-no">01</span><span className="g-method-symbol">⌘</span><h3>Learn the fundamentals</h3><p>Own the C++ object model, lifetime, memory, templates and standard-library building blocks.</p></div>
              <div><span className="g-method-no">02</span><span className="g-method-symbol">◎</span><h3>Understand the trade-offs</h3><p>Build intuition for cache locality, concurrency, scheduling, networking and performance.</p></div>
              <div><span className="g-method-no">03</span><span className="g-method-symbol">↗</span><h3>Connect it to systems</h3><p>See how these ideas apply to low-latency trading, EDA software, GPU workloads and infrastructure.</p></div>
            </div>
          </div>
        </section>

        <section className="g-section g-video-section">
          <div className="site-container g-video-layout">
            <div className="g-video-visual"><img src={imageForCourse("core-cpp-interview-series","C++ Core")} alt="C++ systems course artwork" loading="lazy" /><span className="g-play-symbol">▶</span></div>
            <div className="g-video-copy"><p className="g-section-kicker">REAL VIDEO LESSONS</p><h2>Don't just read about it. <span>Learn it in depth.</span></h2><p>Our video learning tracks connect C++ concepts with memory, assembly, atomics, CPU caches and the systems-level reasoning behind them.</p><div className="g-video-count"><strong>{videos}</strong><span>real lessons across {youtubeSeries.length} curated video tracks</span></div><Link href="/courses/core-cpp-interview-series" className="g-button g-button-primary">Start watching <span>→</span></Link></div>
          </div>
        </section>

        <section className="g-section">
          <div className="site-container">
            <div className="g-section-header"><div><p className="g-section-kicker">FROM THE BLOG</p><h2>Engineering notes that go deeper</h2><p>Detailed explanations, architecture lessons and practical roadmaps written for people who want to understand the full system.</p></div><Link className="g-inline-link" href="/blog">Browse all articles →</Link></div>
            <div className="g-blog-grid">{posts.map(post => <Link href={"/blog/" + post.slug} className="g-blog-card" key={post.slug}>
              <div className="g-blog-art"><img src={imageForBlog(post.slug)} alt="" loading="lazy" /></div>
              <div className="g-blog-content"><div className="g-blog-meta"><span>{shortDate(post.publishedAt)}</span><span>{post.readingTime}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className="g-course-link">Read the article →</span></div>
            </Link>)}</div>
          </div>
        </section>

        <section className="g-section g-faq-section">
          <div className="site-container g-faq-layout">
            <div><p className="g-section-kicker">GOOD TO KNOW</p><h2>Frequently asked questions</h2><p>What you can expect from learning with cppvalley.</p><Link className="g-inline-link" href="/courses">Explore the library →</Link></div>
            <div className="g-faq-list">
              <details><summary>Where should I start if I'm learning C++?<span>+</span></summary><p>Start with Core C++ for Interviews. Learn memory, ownership, RAII, object lifetime, the STL and the object model before moving into concurrency and Linux internals.</p></details>
              <details><summary>Are there video lessons?<span>+</span></summary><p>Yes. Our C++ Interview, Concurrency and Student Roadmap video tracks contain real cppvalley YouTube lessons. Other courses currently show curriculum outlines so you can understand the intended scope.</p></details>
              <details><summary>Can I learn low-latency or HFT systems here?<span>+</span></summary><p>Yes. The Systems learning track covers operating systems, C++ performance, networking, market microstructure and low-latency architecture. The blog adds detailed research-based explanations.</p></details>
              <details><summary>Do I need previous systems experience?<span>+</span></summary><p>Not for the foundational C++ material. Advanced HFT, lock-free concurrency, EDA and GPU topics assume working C++ familiarity; check the level and scope on each course page.</p></details>
            </div>
          </div>
        </section>
        <section className="g-bottom-cta"><div className="site-container"><div><p className="g-section-kicker">KEEP GETTING BETTER</p><h2>Your next breakthrough starts with understanding.</h2><p>Choose a focused course or dive into a technical note. Everything begins with the fundamentals.</p></div><Link href="/courses" className="g-button g-button-white">Explore courses →</Link></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}