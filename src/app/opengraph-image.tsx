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
          background: "linear-gradient(135deg, #251e22 0%, #661e36 100%)",
          color: "#fff4f7",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 800, color: "#ffabc1" }}>cppvalley</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 0.96, letterSpacing: -3.2, fontWeight: 850, maxWidth: 960 }}>
            Quant/HFT C++, GPU & AI Systems
          </div>
          <div style={{ fontSize: 34, color: "#f5cad7", maxWidth: 940 }}>
            CUDA · GPU Kernels · AI Inference · Architecture
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#b01443" }}>
          <span>Courses</span>
          <span>Interview Questions</span>
          <span>Blog Notes</span>
          <span>Career Paths</span>
        </div>
      </div>
    ),
    size
  );
}
