import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ background: '#0a0a0a', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px', letterSpacing: '3px', textTransform: 'uppercase' }}>Early Access</div>
          <div style={{ color: '#ffffff', fontSize: '56px', fontWeight: '700', letterSpacing: '-2px', lineHeight: 1.1 }}>Join the Waitlist</div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '22px' }}>silklearn.io/waitlist</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
