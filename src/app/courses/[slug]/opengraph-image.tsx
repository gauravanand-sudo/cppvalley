import { ImageResponse } from "next/og";
import { eliteCoursesBySlug } from "@/data/elite-courses";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type CourseOgProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: CourseOgProps) {
  const { slug } = await params;
  const course = eliteCoursesBySlug.get(slug);
  const title = course?.title ?? "cppvalley Course";
  const description = course?.summary ?? "Elite C++ learning with executable coding practice.";
  const pillar = course?.track ?? "Course";

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
          background: "linear-gradient(135deg, #251e22 0%, #661e36 100%)",
          color: "#fff4f7",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#ffabc1" }}>cppvalley</div>
          <div style={{ fontSize: 24, color: "#b01443", border: "1px solid #c77b94", borderRadius: 999, padding: "10px 20px" }}>{pillar}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 66, lineHeight: 0.98, letterSpacing: -2.6, fontWeight: 850, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#f2c7d5", maxWidth: 960 }}>
            {description}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#eac9d3" }}>C++ · Algorithms · Concurrency · Systems Engineering</div>
      </div>
    ),
    size
  );
}
