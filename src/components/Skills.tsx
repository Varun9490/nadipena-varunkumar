'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Code2,
  Globe,
  Brain,
  Database,
  Cloud,
  Shield,
  Wrench,
  Crosshair,
} from 'lucide-react';
import { skillGroups } from '@/lib/data';
import type { SkillGroup } from '@/lib/types';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Code2,
  Globe,
  Brain,
  Database,
  Cloud,
  Shield,
  Wrench,
  Crosshair,
};

const heroDescriptions: Record<string, string> = {
  'ai-genai':
    'Building intelligent systems with LLM orchestration, RAG pipelines, and AI safety guardrails.',
  cybersecurity:
    'Offensive security testing — finding vulnerabilities before attackers do. Bug bounty hunting, pentesting, and security automation.',
};

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[group.icon];

  const sizeClasses =
    group.size === 'large'
      ? 'md:col-span-2 md:row-span-2'
      : group.size === 'medium'
        ? 'md:col-span-1 md:row-span-1'
        : 'md:col-span-1 md:row-span-1';

  const isHero = group.size === 'large';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`glass-card flex flex-col gap-4 ${sizeClasses}`}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className="p-2 rounded-lg"
            style={{
              background: isHero ? 'var(--accent-muted)' : 'transparent',
              color: isHero ? 'var(--accent)' : 'var(--text-primary)',
            }}
          >
            <Icon size={isHero ? 22 : 18} />
          </div>
        )}
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: 'var(--text-primary)' }}
        >
          {group.category}
        </h3>
      </div>

      {isHero && heroDescriptions[group.id] && (
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {heroDescriptions[group.id]}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {group.skills.map((skill) => (
          <motion.span
            key={skill}
            className="skill-pill"
            whileHover={{
              scale: 1.05,
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 md:py-32" aria-label="Skills">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Skills</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
            }}
          >
            Tools of the trade.
          </h2>
          <p
            className="text-base mb-16 max-w-lg"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Development expertise meets security mindset — from building to breaking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
