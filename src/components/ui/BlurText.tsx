'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function BlurText({ children, className, delay = 0 }: BlurTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const words = children.split(' ');

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{
            filter: 'blur(12px)',
            opacity: 0,
          }}
          animate={
            inView
              ? {
                  filter: 'blur(0px)',
                  opacity: 1,
                }
              : {
                  filter: 'blur(12px)',
                  opacity: 0,
                }
          }
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
