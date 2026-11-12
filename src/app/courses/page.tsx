import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { CourseCatalog } from "@/components/CourseCatalog";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses } from "@/data/courses";
import { catalogHeroImage, heroImages } from "@/data/media";
import { youtubeSeries } from "@/data/youtube";

export const metadata: Metadata = {
  title: "C++ Systems Courses & Learning Tracks",
  description: "Browse cppvalley's C++ courses and real video lessons across modern C++, concurrency, Linux, HFT, EDA, GPU and AI infrastructure.",
  alternates: {canonical: "/courses"},
};

const coursesAdSlot = process.env.NEXT_PUBLIC_ADSENSE_COURSES_FEED_SLOT;

export default async function CoursesPage({ searchParams }: {searchParams: Promise<{q?: string;track?: string}>}) {
  const params = await searchParams;
  const tracks = Array.from(new Set(courses.map(course => course.pillar)));
  return (
    <div>
      <SiteHeader />
      <main className="page-main">
        <section className="g-catalog-hero">
          <div className="site-container g-catalog-hero-layout">
            <div><div className="g-breadcrumb"><Link href="/">Home</Link><span>/</span><strong>Courses</strong></div><span className="g-pill">THE COURSE LIBRARY</span>
              <h1>Master C++. <span>Understand every layer.</span></h1>
              <p>Explore carefully structured courses from language fundamentals to complex systems engineering. Search by technology, skill or topic, and find your next learning path.</p>
              <div className="g-catalog-facts"><span>✓ {courses.length} course outlines</span><span>✓ {tracks.length} focused tracks</span><span>✓ {youtubeSeries.length} video series</span></div>
            </div>
            <div className="g-catalog-art" aria-hidden="true"><img src={catalogHeroImage} alt="" /><img src={heroImages[1]} alt="" /></div>
          </div>
        </section>
        <section className="g-section g-catalog-section">
          <div className="site-container">
            <div className="g-section-header"><div><p className="g-section-kicker">DISCOVER WHAT TO LEARN</p><h2>Explore all courses</h2><p>Filter by learning track, search specific subjects, or follow the recommended order.</p></div></div>
            <CourseCatalog courses={courses} initialQuery={params.q ?? ""} initialTrack={params.track ?? "All tracks"} />
            <AdSlot slot={coursesAdSlot} className="ad-slot-leaderboard" />
          </div>
        </section>
        <section className="g-bottom-cta"><div className="site-container"><div><p className="g-section-kicker">PREFER WRITTEN DEEP DIVES?</p><h2>Keep learning beyond the course outline.</h2><p>Explore long-form notes about C++, performance and real production systems.</p></div><Link href="/blog" className="g-button g-button-white">Browse the blog →</Link></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}