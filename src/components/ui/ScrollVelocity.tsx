'use client';

import { useRef, useEffect, type ReactNode } from 'react';

interface ScrollVelocityProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export function ScrollVelocity({
  children,
  speed = 30,
  direction = 'left',
  className,
}: ScrollVelocityProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const positionRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const contentWidth = scrollContainer.scrollWidth / 2;
    const dir = direction === 'left' ? -1 : 1;

    const animate = () => {
      positionRef.current += (speed / 60) * dir;

      if (direction === 'left' && positionRef.current <= -contentWidth) {
        positionRef.current = 0;
      } else if (direction === 'right' && positionRef.current >= 0) {
        positionRef.current = -contentWidth;
      }

      if (scrollContainer) {
        scrollContainer.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start from correct position for right direction
    if (direction === 'right') {
      positionRef.current = -contentWidth;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, direction]);

  return (
    <div className={className} style={{ overflow: 'hidden', width: '100%' }}>
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '2rem',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {/* Duplicate for seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
}
