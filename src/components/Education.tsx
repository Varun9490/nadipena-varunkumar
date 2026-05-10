'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { education } from '@/lib/data';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="py-24 md:py-32" aria-label="Education">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Education</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-16 max-w-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
            }}
          >
            Academic foundation.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap
                  size={18}
                  style={{ color: 'var(--accent)' }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {edu.period}
                </span>
              </div>

              <h3
                className="text-base font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {edu.degree}
              </h3>
              <p
                className="text-sm mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                {edu.institution}
              </p>

              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'var(--accent-muted)',
                  color: 'var(--accent)',
                }}
              >
                {edu.score}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
