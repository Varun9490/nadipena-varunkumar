'use client';

import { useEffect, useRef } from 'react';

export function BackgroundBeams({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const beams = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * canvas.offsetWidth,
      speed: 0.3 + Math.random() * 0.5,
      width: 1 + Math.random() * 2,
      offset: Math.random() * Math.PI * 2,
      hue: 190 + i * 5,
    }));

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      beams.forEach((beam) => {
        const x =
          beam.x +
          Math.sin(time * beam.speed + beam.offset) * 100;

        const gradient = ctx.createLinearGradient(x, 0, x, canvas.offsetHeight);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(
          0.3,
          `hsla(${beam.hue}, 80%, 55%, 0.03)`
        );
        gradient.addColorStop(
          0.5,
          `hsla(${beam.hue}, 80%, 55%, 0.06)`
        );
        gradient.addColorStop(
          0.7,
          `hsla(${beam.hue}, 80%, 55%, 0.03)`
        );
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(x - beam.width, 0);
        ctx.lineTo(x + beam.width, 0);
        ctx.lineTo(x + beam.width + 20, canvas.offsetHeight);
        ctx.lineTo(x - beam.width + 20, canvas.offsetHeight);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
