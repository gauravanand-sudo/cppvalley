import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "linear-gradient(135deg, #ffffff 0%, #edf5fb 100%)",
          color: "#17202a",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 800, color: "#365c7d" }}>cppvalley courses</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 70, lineHeight: 0.98, letterSpacing: -2.8, fontWeight: 850, maxWidth: 970 }}>
            Choose a focused systems track
          </div>
          <div style={{ fontSize: 32, color: "#496273", maxWidth: 920 }}>
            C++ Core · Systems · EDA/CAD · GPU/AI · Roadmaps
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#667085" }}>Built for students preparing for serious engineering roles</div>
      </div>
    ),
    size
  );
}
