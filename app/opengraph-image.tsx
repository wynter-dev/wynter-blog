import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #5be6d5 0%, #9a8dff 50%, #ff82c5 100%)',
          color: '#ffffff',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        <div style={{fontSize: 80, fontWeight: 700}}>Wynter.log</div>
        <div style={{fontSize: 40, opacity: 0.7, marginTop: 20, fontWeight: 400}}>
          개발 · 인프라 · 일상 기록 블로그
        </div>
      </div>
    ),
    size,
  );
}
