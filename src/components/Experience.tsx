'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { MapPin, Calendar } from 'lucide-react';
import { experiences } from '@/lib/data';
import type { Experience } from '@/lib/types';

function TimelineItem({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-10 md:pl-14 pb-12 last:pb-0"
    >
      {/* Dot */}
      <motion.div
        className="absolute left-[6px] md:left-[14px] top-1 w-3 h-3 rounded-full z-10"
        style={{ background: 'var(--accent)' }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
      />

      {/* Content */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3
              className="text-lg font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {experience.company}
            </h3>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--accent)' }}
            >
              {experience.role}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {experience.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {experience.location}
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {experience.highlights.map((item, i) => (
            <li
              key={i}
              className="text-sm leading-relaxed flex items-start gap-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span
                className="mt-2 w-1 h-1 rounded-full shrink-0"
                style={{ background: 'var(--text-tertiary)' }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="work" className="py-24 md:py-32" aria-label="Experience">
      <div className="section-container">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Experience</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-16 max-w-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
            }}
          >
            Where I&apos;ve been building.
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Static timeline background line */}
          <div className="timeline-line" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-[11px] md:left-[19px] top-0 w-[2px] origin-top z-[1]"
            style={{
              background: 'var(--accent)',
              height: lineHeight,
            }}
          />

          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
