import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0F1117 0%, #1A1D27 100%)',
          color: 'white',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        <div style={{fontSize: 72, fontWeight: '700', lineHeight: 1.2}}>
          Wynter.log
        </div>

        <div
          style={{
            fontSize: 32,
            marginTop: 20,
            opacity: 0.7,
            lineHeight: 1.4,
          }}
        >
          개발 · 인프라 · 일상 기록 블로그
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 80,
            fontSize: 28,
            opacity: 0.25,
          }}
        >
          wynter-dev.vercel.app
        </div>
      </div>
    ),
    size,
  );
}
