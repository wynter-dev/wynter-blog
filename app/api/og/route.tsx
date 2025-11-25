import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function GET(req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "60px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F1117 0%, #1A1D27 100%)",
          color: "white",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>Wynter.log</div>
        <div style={{ fontSize: 32, opacity: 0.7, marginTop: 20 }}>
          개발 · 인프라 · 일상 기록 블로그
        </div>
      </div>
    ),
    size
  );
}
