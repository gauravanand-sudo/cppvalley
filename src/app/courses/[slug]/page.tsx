import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { CourseOutline } from "@/components/CourseOutline";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VideoCoursePlayer } from "@/components/VideoCoursePlayer";
import { courses, coursesBySlug } from "@/data/courses";
import { imageForCourse } from "@/data/media";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

type Props = { params: Promise<{slug: string}> };
const playableSeries: Record<string,string> = {
  "core-cpp-interview-series": "core-cpp-interviews",
  "concurrency-low-latency-lessons": "concurrency-low-latency",
  "student-roadmap-lessons": "student-roadmap",
};
const courseAdSlot = process.env.NEXT_PUBLIC_ADSENSE_COURSE_SLOT;
function getSeries(slug: string) {
  return youtubeSeries.find(series => series.slug === playableSeries[slug]);
}
export function generateStaticParams() {return courses.map(course => ({slug:course.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug} = await params;
  const course = coursesBySlug.get(slug);
  if (!course) return {};
  return {
    title:course.title,
    description:course.description,
    alternates:{canonical:"/courses/" + course.slug},
    keywords:course.tags,
    openGraph:{title:course.title, description:course.description, url:"/courses/" + course.slug, images:[{url:"/courses/" + course.slug + "/opengraph-image",alt:course.title}]}
  };
}
export default async function CoursePage({params}:Props) {
  const {slug} = await params;
  const course = coursesBySlug.get(slug);
  if (!course) notFound();
  const series = getSeries(slug);
  const visual = imageForCourse(course.slug,course.pillar);
  const structuredData = {
    "@context":"https://schema.org","@type":"Course",name:course.title,
    description:course.longDescription,url:"https://cppvalley.com/courses/" + course.slug,
    provider:{"@type":"Organization",name:"cppvalley",sameAs:youtubeChannelUrl},
    educationalLevel:course.level,teaches:course.tags,
    ...(series ? {hasCourseInstance:series.videos.map((video,index)=>({
      "@type":"VideoObject",position:index+1,name:video.title,
      embedUrl:youtubeEmbedUrl(video.videoId),
      url:"https://www.youtube.com/watch?v=" + video.videoId,
    }))}:{})
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/>
      <SiteHeader/>
      <main className="page-main g-detail-page">
        <section className="g-detail-hero">
          <div className="site-container">
            <div className="g-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/courses">Courses</Link><span>/</span><strong>{course.pillar}</strong></div>
            <div className="g-detail-hero-layout">
              <div><span className="g-pill">{course.pillar} · {series ? "VIDEO LEARNING TRACK" : "COURSE OUTLINE"}</span>
                <h1>{course.title}</h1><p className="g-detail-description">{course.description}</p>
                <div className="g-detail-facts"><span>◎ {course.level}</span><span>▤ {course.duration}</span><span>◉ {course.modules.length} modules</span></div>
                <div className="g-course-tags">{course.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
                <div className="g-detail-actions"><a className="g-button g-button-primary" href={series ? "#video-lessons" : "#curriculum"}>{series ? "Watch lessons" : "Explore curriculum"} <span>↓</span></a><Link className="g-button g-button-outline" href="/courses">All courses</Link></div>
              </div>
              <div className="g-detail-cover"><img src={visual} alt="" /><div className="g-detail-cover-label"><span>cppvalley learning</span><strong>{course.shortTitle}</strong></div></div>
            </div>
          </div>
        </section>

        {series ? (
          <section className="g-section g-lesson-section" id="video-lessons"><div className="site-container">
            <div className="g-section-header"><div><p className="g-section-kicker">LEARN BY WATCHING</p><h2>Start your lessons</h2><p>{series.description}</p></div></div>
            <VideoCoursePlayer series={series}/>
            <AdSlot slot={courseAdSlot} className="ad-slot-leaderboard"/>
            <div className="g-outline-follow"><Link className="g-inline-link" href="#curriculum">See the topic outline ↓</Link></div>
          </div></section>
        ):null}

        <div className="site-container g-detail-main">
          <div className="g-detail-content">
            <section id="overview" className="g-detail-block"><p className="g-section-kicker">COURSE OVERVIEW</p><h2>What this course covers</h2><p className="g-detail-intro">{course.longDescription}</p>
              <div className="g-topic-grid">{course.tags.map(tag=><div key={tag}><span>✓</span><strong>{tag}</strong></div>)}</div>
            </section>
            <section id="curriculum" className="g-detail-block"><p className="g-section-kicker">COURSE CONTENT</p><h2>Curriculum outline</h2><p className="g-detail-intro">{course.modules.length} modules organized in the order they appear in this learning track. {series ? "Use the video player above for the available lessons." : "This page presents the curriculum scope; it does not claim that every module has a published lesson."}</p>
              <CourseOutline modules={course.modules}/>
            </section>
            <AdSlot slot={courseAdSlot} className="ad-slot-leaderboard"/>
            <section className="g-detail-block"><p className="g-section-kicker">KEEP EXPLORING</p><h2>More depth, when you need it.</h2><p className="g-detail-intro">The engineering journal connects C++ patterns to performance measurements, trading infrastructure and real architectures.</p><Link href="/blog" className="g-button g-button-outline">Read engineering notes →</Link></section>
          </div>
          <aside className="g-detail-aside">
            <div className="g-course-purchase-card"><div className="g-course-purchase-image"><img src={visual} alt="" /></div>
              <div className="g-course-purchase-body"><span className="g-course-status">{series ? "Real video lessons" : "Curriculum outline available"}</span><h3>Explore this course</h3>
                <div><span>Track</span><strong>{course.pillar}</strong></div><div><span>Level</span><strong>{course.level}</strong></div><div><span>Scope</span><strong>{course.duration}</strong></div><div><span>Modules</span><strong>{course.modules.length}</strong></div>
                <a href={series ? "#video-lessons" : "#curriculum"} className="g-button g-button-primary">{series ? "Start video lessons" : "View curriculum"} →</a>
                <p>{series ? "Watch the original cppvalley lessons in order." : "See the exact topics planned for this course. No enrollment or paid access is implied."}</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter/>
    </div>
  );
}