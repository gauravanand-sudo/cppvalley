import { ImageResponse } from "next/og";
import { blogPostsBySlug } from "@/data/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type BlogOgProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: BlogOgProps) {
  const { slug } = await params;
  const post = blogPostsBySlug.get(slug);
  const title = post?.title ?? "cppvalley Blog";
  const topics = post?.topics?.join(" · ") ?? "C++ · Systems · Low Latency";

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
          background: "linear-gradient(135deg, #fffafb 0%, #fbe6ec 100%)",
          color: "#242125",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#b01443" }}>cppvalley Blog</div>
          <div style={{ fontSize: 22, color: "#786d73" }}>{post?.readingTime ?? "Engineering note"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 64, lineHeight: 1, letterSpacing: -2.3, fontWeight: 850, maxWidth: 1020 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#8b435c", maxWidth: 1000 }}>
            {topics}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#786d73" }}>Technical notes for serious students</div>
      </div>
    ),
    size
  );
}
