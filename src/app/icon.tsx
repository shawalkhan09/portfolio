import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Literal colors, not CSS vars: this renders at build time via
// satori/resvg, not in a browser, so theme custom properties aren't
// available. The tab bar isn't restyled by the site's own theme anyway.
export default function Icon() {
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
        fontSize: 18,
        fontWeight: 700,
        fontFamily: "sans-serif",
      }}
    >
      SK
    </div>,
    size,
  );
}
