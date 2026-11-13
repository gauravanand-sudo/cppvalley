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
          background: "linear-gradient(135deg, #15243b 0%, #273858 100%)",
          color: "#f5f8ff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 800, color: "#cad8f8" }}>cppvalley courses</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 70, lineHeight: 0.98, letterSpacing: -2.8, fontWeight: 850, maxWidth: 970 }}>
            Seven paths to C++ mastery
          </div>
          <div style={{ fontSize: 32, color: "#cdd8ed", maxWidth: 920 }}>
            Core C++ · DSA · Design · Linux · Concurrency · HFT
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#c3d0e5" }}>Built for students preparing for serious engineering roles</div>
      </div>
    ),
    size
  );
}
