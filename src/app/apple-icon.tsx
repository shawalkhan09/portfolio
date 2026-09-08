import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Literal colors, not CSS vars: this renders at build time via
// satori/resvg, not in a browser, so theme custom properties aren't
// available.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0d0f",
        color: "#2dd4bf",
        fontSize: 92,
        fontWeight: 700,
        fontFamily: "sans-serif",
      }}
    >
      SK
    </div>,
    size,
  );
}
