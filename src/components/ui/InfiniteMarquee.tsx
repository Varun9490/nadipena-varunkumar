'use client';

import { type ReactNode } from 'react';

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  children,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className,
}: InfiniteMarqueeProps) {
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';
  const duration = `${speed}s`;

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        width: '100%',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div
        className={pauseOnHover ? 'marquee-track' : undefined}
        style={{
          display: 'flex',
          gap: '1.5rem',
          width: 'max-content',
          animation: `marqueeScroll ${duration} linear infinite`,
          animationDirection,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
