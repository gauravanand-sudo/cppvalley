import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { VideoCoursePlayer } from "@/components/VideoCoursePlayer";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

type VideoCoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return youtubeSeries.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({ params }: VideoCoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = youtubeSeries.find((item) => item.slug === slug);

  if (!series) return {};

  const firstVideo = series.videos[0];

  return {
    title: `${series.title} — cppvalley Course`,
    description: series.description,
    alternates: { canonical: `/youtube/${series.slug}` },
    keywords: series.seoKeywords,
    openGraph: {
      title: series.title,
      description: series.description,
      url: `/youtube/${series.slug}`,
      type: "video.other",
      images: firstVideo ? [{ url: `https://img.youtube.com/vi/${firstVideo.videoId}/hqdefault.jpg`, alt: firstVideo.title }] : undefined,
    },
  };
}

function youtubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export default async function VideoCoursePage({ params }: VideoCoursePageProps) {
  const { slug } = await params;
  const series = youtubeSeries.find((item) => item.slug === slug);

  if (!series) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: series.title,
    description: series.description,
    url: `https://cppvalley.com/youtube/${series.slug}`,
    provider: {
      "@type": "Organization",
      name: "cppvalley",
      sameAs: youtubeChannelUrl,
    },
    hasCourseInstance: series.videos.map((video, index) => ({
      "@type": "VideoObject",
      position: index + 1,
      name: video.title,
      embedUrl: youtubeEmbedUrl(video.videoId),
      url: youtubeWatchUrl(video.videoId),
    })),
  };

  return (
    <div className="page-shell lp-page academic-page video-course-watch-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main className="course-player-page">
        <VideoCoursePlayer series={series} />
      </main>
    </div>
  );
}
