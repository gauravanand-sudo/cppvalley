import { ImageResponse } from "next/og";

export const alt = "cppvalley — From cache line to executed order";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f2f7f5",
          background: "#070a0d",
          backgroundImage:
            "linear-gradient(rgba(93,255,193,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(93,255,193,.08) 1px, transparent 1px), radial-gradient(circle at 75% 25%, rgba(91,210,255,.20), transparent 35%)",
          backgroundSize: "48px 48px, 48px 48px, 100% 100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "32px" }}>
          <div
            style={{
              width: "58px",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              background: "#5dffc1",
              color: "#07100d",
              fontWeight: 800,
            }}
          >
            cv
          </div>
          <span>cppvalley</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ color: "#5dffc1", fontSize: "22px", letterSpacing: "4px" }}>
            HFT CORE SYSTEMS / PUBLIC LAB
          </div>
          <div style={{ maxWidth: "940px", fontSize: "76px", lineHeight: 1.02, fontWeight: 760 }}>
            From cache line to executed order.
          </div>
          <div style={{ color: "#9caaa5", fontSize: "26px" }}>
            96 episodes · 9 phases · 4 flagship systems
          </div>
        </div>
      </div>
    ),
    size,
  );
}
