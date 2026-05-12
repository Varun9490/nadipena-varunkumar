'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { bioText, stats } from '@/lib/data';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { TiltCard } from './ui/TiltCard';

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

  // Split bio into sentences for staggered reveal
  const bioSentences = bioText.split('. ').map((s, i, arr) =>
    i < arr.length - 1 ? s + '.' : s
  );

  return (
    <section id="about" className="py-24 md:py-32" aria-label="About">
      <div className="section-container">
        <div ref={ref}>
          <RevealOnScroll direction="left">
            <span className="section-label">02 — About</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2
              className="text-3xl md:text-5xl font-bold mb-16 max-w-2xl"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
              }}
            >
              A developer who thinks like an attacker.
            </h2>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Profile image with TiltCard */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <RevealOnScroll delay={0.2}>
              <TiltCard
                className="rounded-2xl overflow-hidden"
                tiltAmount={8}
                glareOpacity={0.15}
              >
                <div className="avatar-ring" style={{ width: '200px', height: '200px' }}>
                  <Image
                    src="/profile.jpg"
                    alt="Nadipena Varunkumar"
                    width={200}
                    height={200}
                    className="rounded-full object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>

          {/* Bio — staggered sentence reveal */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              {bioSentences.map((sentence, i) => (
                <RevealOnScroll key={i} delay={0.15 + i * 0.1} direction="up">
                  <p
                    className="text-base md:text-lg leading-relaxed mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {sentence}
                  </p>
                </RevealOnScroll>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                  animate={
                    isInView
                      ? { opacity: 1, clipPath: 'inset(0 0 0 0)' }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.1,
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
      </div>
    </section>
  );
}
