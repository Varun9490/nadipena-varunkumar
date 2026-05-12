'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function SplitText({
  children,
  className,
  delay = 0,
  staggerDelay = 0.04,
  as: Tag = 'span',
}: SplitTextProps) {
  const words = children.split(' ');

  return (
    <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{
              clipPath: 'inset(0 100% 0 0)',
              opacity: 0,
            }}
            animate={{
              clipPath: 'inset(0 0% 0 0)',
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: delay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
