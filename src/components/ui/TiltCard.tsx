'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className,
  tiltAmount = 10,
  glareOpacity = 0,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(
    useTransform(y, [0, 1], [tiltAmount, -tiltAmount]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-tiltAmount, tiltAmount]),
    springConfig
  );

  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), springConfig);
  const glareAlpha = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
    if (glareOpacity > 0) glareAlpha.set(glareOpacity);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    if (glareOpacity > 0) glareAlpha.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        position: 'relative',
      }}
    >
      {children}
      {glareOpacity > 0 && (
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            opacity: glareAlpha,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.8), transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
