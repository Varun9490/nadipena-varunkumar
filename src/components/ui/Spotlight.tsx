'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface SpotlightProps {
  className?: string;
  size?: number;
}

export function Spotlight({ className, size = 400 }: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0, 180, 216, 0.12) 0%, rgba(0, 180, 216, 0.04) 40%, transparent 70%)',
          x: spotlightX,
          y: spotlightY,
          translateX: '-50%',
          translateY: '-50%',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
