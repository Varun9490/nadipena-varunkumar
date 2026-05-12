'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { BadgeCheck } from 'lucide-react';
import { certifications, achievements } from '@/lib/data';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { BlurText } from './ui/BlurText';
import { InfiniteMarquee } from './ui/InfiniteMarquee';

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="certifications"
      className="py-24 md:py-32"
      aria-label="Certifications and Achievements"
    >
      <div className="section-container">
        <div ref={ref}>
          <RevealOnScroll direction="left">
            <span className="section-label">06 — Recognition</span>
          </RevealOnScroll>
          <h2
            className="text-3xl md:text-5xl font-bold mb-16 max-w-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
            }}
          >
            <BlurText delay={0.1}>
              Certifications & Achievements
            </BlurText>
          </h2>
        </div>
      </div>

      {/* Achievements — Infinite horizontal scroll ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <InfiniteMarquee speed={45} direction="left" pauseOnHover>
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="glass-card flex items-center gap-4 shrink-0 min-w-[280px]"
              style={{ padding: '16px 24px' }}
            >
              <span className="text-2xl">{achievement.highlight}</span>
              <p
                className="text-sm font-medium leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {achievement.title}
              </p>
            </div>
          ))}
        </InfiniteMarquee>
      </motion.div>

      {/* Certifications Grid */}
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <RevealOnScroll delay={0.3}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-6"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Certifications
              </h3>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                  animate={
                    isInView
                      ? { opacity: 1, clipPath: 'inset(0 0 0 0)' }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="card flex items-start gap-3 p-4"
                >
                  <BadgeCheck
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--accent)' }}
                  />
                  <div>
                    <p
                      className="text-sm font-medium leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {cert.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {cert.issuer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements list */}
          <div>
            <RevealOnScroll delay={0.35}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-6"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Achievements
              </h3>
            </RevealOnScroll>
            <div className="space-y-4">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                  animate={
                    isInView
                      ? { opacity: 1, clipPath: 'inset(0 0 0 0)' }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-200"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      background: 'var(--accent)',
                      boxShadow: '0 0 8px var(--accent-glow)',
                    }}
                  />
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {achievement.highlight} {achievement.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
