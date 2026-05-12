'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const count = useMotionValue(0);
  const smoothCount = useSpring(count, { damping: 30, stiffness: 100 });
  const displayCount = useTransform(smoothCount, (v) => Math.round(v));
  const progressScaleX = useTransform(smoothCount, [0, 100], [0, 1]);
  const [displayValue, setDisplayValue] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    // Simulate loading progress
    const steps = [
      { target: 30, delay: 200 },
      { target: 60, delay: 600 },
      { target: 85, delay: 1000 },
      { target: 100, delay: 1500 },
    ];

    steps.forEach(({ target, delay }) => {
      setTimeout(() => count.set(target), delay);
    });

    // Finish loading
    setTimeout(() => setLoaded(true), 2400);
  }, [count]);

  useEffect(() => {
    const unsubscribe = displayCount.on('change', (v) => {
      setDisplayValue(Math.round(v));
    });
    return unsubscribe;
  }, [displayCount]);

  // Remove from DOM after exit animation
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShouldRender(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!shouldRender) return null;

  // SVG path for "VK" initials
  const vPath = 'M 10 10 L 25 50 L 40 10';
  const kPath = 'M 50 10 L 50 50 M 50 30 L 70 10 M 50 30 L 70 50';

  return (
    <AnimatePresence mode="wait">
      {!loaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: [
              'inset(0 0 0 0)',
              'inset(50% 0 50% 0)',
            ],
            opacity: [1, 0],
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
          }}
        >
          {/* SVG Initials with stroke animation */}
          <svg
            width="80"
            height="60"
            viewBox="0 0 80 60"
            fill="none"
            style={{ marginBottom: '32px' }}
          >
            <motion.path
              d={vPath}
              stroke="#00b4d8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3 },
              }}
            />
            <motion.path
              d={kPath}
              stroke="#00b4d8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: { duration: 0.3, delay: 0.3 },
              }}
            />
          </svg>

          {/* Counter */}
          <div
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.15em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {displayValue}%
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: '120px',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.08)',
              marginTop: '16px',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: '#00b4d8',
                scaleX: progressScaleX,
                transformOrigin: 'left',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
