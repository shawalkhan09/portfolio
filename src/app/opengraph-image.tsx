import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        padding: 96,
        background: "#0b0d0f",
        color: "#f2f4f6",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
        {SITE_NAME}
      </div>
      <div style={{ fontSize: 36, color: "#2dd4bf" }}>{SITE_DESCRIPTION}</div>
    </div>,
    size,
  );
}
