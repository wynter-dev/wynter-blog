import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          color: 'white',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        <div style={{fontSize: 68, fontWeight: 700, lineHeight: 1.2}}>
          Wynter.log
        </div>

        <div
          style={{
            fontSize: 30,
            opacity: 0.75,
            marginTop: 18,
            lineHeight: 1.45,
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
            opacity: 0.3,
          }}
        >
          @wynter_dev
        </div>
      </div>
    ),
    size,
  );
}
