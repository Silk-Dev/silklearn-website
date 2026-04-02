'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

interface Props {
  totalSegments?: number;
  lineColor?: string;
  maxLineWidth?: number;
  movementThreshold?: number;
  timeWindow?: number;
  messageDuration?: number;
}

export function CursorTrailAnimation({
  totalSegments = 20,
  lineColor = '#fff',
  maxLineWidth = 8,
  movementThreshold = 4000,
  timeWindow = 500,
  messageDuration = 3000,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const canvas = canvasRef.current;
    const message = messageRef.current;
    if (!canvas || !message) return;

    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Plain-object segments — no React state, zero re-renders
    const segments = Array.from({ length: totalSegments }, () => ({ x: 0, y: 0 }));
    let lastMoveTime = Date.now();
    let showingMessage = false;
    const movementHistory: { timestamp: number; distance: number }[] = [];

    function checkMovementIntensity(now: number, distance: number): boolean {
      movementHistory.push({ timestamp: now, distance });
      const cutoff = now - timeWindow;
      while (movementHistory.length && movementHistory[0].timestamp < cutoff) {
        movementHistory.shift();
      }
      return movementHistory.reduce((sum, m) => sum + m.distance, 0) > movementThreshold;
    }

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - segments[0].x;
      const dy = e.clientY - segments[0].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (checkMovementIntensity(now, distance) && !showingMessage) {
        showingMessage = true;
        gsap.killTweensOf(message);
        gsap.set(message, { left: e.clientX + 20, top: e.clientY - 40, display: 'flex' });
        gsap.fromTo(
          message,
          { opacity: 0, scale: 0.5, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' },
        );

        gsap.delayedCall(messageDuration / 1000, () => {
          gsap.to(message, {
            opacity: 0,
            scale: 0.5,
            y: -20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(message, { display: 'none' });
              showingMessage = false;
              movementHistory.length = 0;
            },
          });
        });
      }

      segments[0].x = e.clientX;
      segments[0].y = e.clientY;
      lastMoveTime = now;
    };

    window.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      const now = Date.now();
      const contractSpeed = now - lastMoveTime > 100 ? 0.3 : 0.5;

      for (let i = 1; i < totalSegments; i++) {
        segments[i].x += (segments[i - 1].x - segments[i].x) * contractSpeed;
        segments[i].y += (segments[i - 1].y - segments[i].y) * contractSpeed;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < totalSegments - 1; i++) {
        const alpha = 1 - i / totalSegments;
        ctx.beginPath();
        ctx.moveTo(segments[i].x, segments[i].y);
        ctx.lineTo(segments[i + 1].x, segments[i + 1].y);
        ctx.strokeStyle = lineColor;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = maxLineWidth * alpha;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      gsap.killTweensOf(message);
    };
  }, [totalSegments, lineColor, maxLineWidth, movementThreshold, timeWindow, messageDuration]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998,
          userSelect: 'none',
        }}
      />
      {/* Message popup — hidden by default, shown via GSAP */}
      <div
        ref={messageRef}
        style={{
          position: 'fixed',
          display: 'none',
          padding: '12px',
          backgroundColor: 'rgba(31, 41, 55, 0.95)',
          color: 'white',
          borderRadius: '16px',
          fontSize: '14px',
          pointerEvents: 'none',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
          border: '1px solid rgba(75,85,99,0.4)',
          zIndex: 9999,
          whiteSpace: 'nowrap',
          transformOrigin: 'center center',
        }}
      >
        {/* Smile icon inline so no extra import needed */}
        <svg
          style={{ width: 16, height: 16, color: '#FCD34D', flexShrink: 0 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 13s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
        <span>Cool effect huh! we LOVE IT TOO! 😏</span>
      </div>
    </>
  );
}
