import { redirect } from "next/navigation";

const courseSlugBySeriesSlug: Record<string, string> = {
  "core-cpp-interviews": "core-cpp-interview-series",
  "concurrency-low-latency": "concurrency-low-latency-lessons",
  "student-roadmap": "student-roadmap-lessons",
};

type VideoCoursePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VideoCoursePage({ params }: VideoCoursePageProps) {
  const { slug } = await params;
  redirect(`/courses/${courseSlugBySeriesSlug[slug] ?? slug}`);
}
