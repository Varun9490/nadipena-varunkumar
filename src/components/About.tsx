'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { bioText, stats } from '@/lib/data';

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: string;
  suffix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState('0');
  const numericValue = parseFloat(value);

  useEffect(() => {
    if (!inView) return;

    const isFloat = value.includes('.');
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericValue;

      if (isFloat) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.floor(current).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, numericValue, value]);

  return (
    <span
      className="text-3xl md:text-4xl font-bold tabular-nums"
      style={{ color: 'var(--accent)' }}
    >
      {display}
      {suffix && <span className="text-xl md:text-2xl">{suffix}</span>}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32" aria-label="About">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">About</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-16 max-w-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
            }}
          >
            A developer who thinks like an attacker.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {bioText}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card flex flex-col gap-2"
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
                <span
                  className="text-sm leading-snug"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
