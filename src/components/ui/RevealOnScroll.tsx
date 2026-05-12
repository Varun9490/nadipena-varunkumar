'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    up: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0 0 0 0)',
    },
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0)',
    },
    none: {
      hidden: 'inset(0 0 0 0)',
      visible: 'inset(0 0 0 0)',
    },
  };

  const clip = clipPaths[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        clipPath: clip.hidden,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              clipPath: clip.visible,
            }
          : {
              opacity: 0,
              clipPath: clip.hidden,
            }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
