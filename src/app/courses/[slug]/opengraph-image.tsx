import { ImageResponse } from "next/og";
import { coursesBySlug } from "@/data/courses";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type CourseOgProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: CourseOgProps) {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);
  const title = course?.title ?? "cppvalley Course";
  const description = course?.description ?? "C++ systems courses for students.";
  const pillar = course?.pillar ?? "Course";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #f8fbff 0%, #eaf2f8 100%)",
          color: "#17202a",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#365c7d" }}>cppvalley</div>
          <div style={{ fontSize: 24, color: "#365c7d", border: "1px solid #cfe0ec", borderRadius: 999, padding: "10px 20px" }}>{pillar}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 66, lineHeight: 0.98, letterSpacing: -2.6, fontWeight: 850, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#496273", maxWidth: 960 }}>
            {description}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#667085" }}>C++ · Systems · Interview Preparation</div>
      </div>
    ),
    size
  );
}
