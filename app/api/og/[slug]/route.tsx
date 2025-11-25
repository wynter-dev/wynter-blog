import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getPostBySlug } from "@/utils/mdx";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  const title = post.meta?.title ?? "";
  const description = post.meta?.description ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0F1117 0%, #1A1D27 100%)",
          color: "white",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: "700",
            maxWidth: "90%",
            lineHeight: 1.25,
            wordBreak: "break-word",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 28,
            opacity: 0.7,
            marginTop: 24,
            maxWidth: "90%",
            lineHeight: 1.45,
            wordBreak: "break-word",
          }}
        >
          {description}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            fontSize: 26,
            opacity: 0.25,
          }}
        >
          Wynter.log
        </div>
      </div>
    ),
    size
  );
}
