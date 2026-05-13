'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { GlowingCard } from './ui/GlowingCard';
import type { Project } from '@/lib/types';

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ProjectCard({
  project,
  index,
  isFeatured,
}: {
  project: Project;
  index: number;
  isFeatured?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [4, -4]);
  const rotateY = useTransform(x, [-150, 150], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      animate={
        isInView ? { opacity: 1, clipPath: 'inset(0 0 0 0)' } : {}
      }
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 800 }}
      className={isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
    >
      <GlowingCard className="h-full rounded-2xl">
        <motion.article
          className="glass-card h-full flex flex-col"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3
                className="text-xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title}
              </h3>
              <p
                className="text-xs mt-1"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {project.period}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                  style={{ color: 'var(--accent)' }}
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--text-tertiary)')
                }
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon size={18} />
              </a>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <motion.span
                key={tech}
                className="skill-pill"
                style={{ fontSize: '0.7rem' }}
                whileHover={{
                  scale: 1.08,
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                }}
                transition={{ duration: 0.15 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mt-auto">
            {project.highlights.slice(0, isFeatured ? 5 : 3).map((item, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed flex items-start gap-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span
                  className="mt-2 w-1 h-1 rounded-full shrink-0"
                  style={{ background: 'var(--accent)' }}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Live badge */}
          {project.liveUrl && (
            <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold transition-all duration-200 hover:gap-3"
                style={{ color: 'var(--accent)' }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: '#22c55e' }}
                />
                View Live Demo
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </motion.article>
      </GlowingCard>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="projects" className="py-24 md:py-32" aria-label="Projects">
      <div className="section-container">
        <div ref={ref}>
          <RevealOnScroll direction="left">
            <span className="section-label">05 — Projects</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 max-w-2xl"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
              }}
            >
              Things I&apos;ve built.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p
              className="text-base mb-16 max-w-lg"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Security-focused and full-stack applications — each solving
              real-world problems.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isFeatured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
