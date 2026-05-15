'use client';

import { Suspense } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Spotlight } from './ui/Spotlight';
import { SplitText } from './ui/SplitText';
import { RotatingText } from './ui/RotatingText';
import { ScrollVelocity } from './ui/ScrollVelocity';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => null,
});

const techStack = [
  'Next.js', 'Python', 'LangChain', 'React', 'Node.js', 'AWS',
  'Burp Suite', 'Docker', 'PostgreSQL', 'TypeScript', 'Django',
  'Azure', 'OWASP', 'Gemini API', 'MongoDB', 'Framer Motion',
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Mesh Gradient Background (fallback layer) */}
      <div className="mesh-gradient" aria-hidden="true" />

      {/* Spotlight cursor-follow glow */}
      <Spotlight size={500} />

      {/* Grain Texture */}
      <svg className="grain-overlay" aria-hidden="true">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="section-container relative z-10 w-full pt-24 pb-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left — Name, Heading & CTAs */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 2.4 }}
              className="text-lg md:text-xl font-medium mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Hi, I&apos;m
            </motion.p>

            <div
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
              }}
            >
              <SplitText
                delay={2.5}
                staggerDelay={0.08}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight font-normal"
              >
                Nadipena Varunkumar
              </SplitText>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.9 }}
              className="text-2xl sm:text-3xl md:text-4xl leading-[1.15] tracking-tight mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
                opacity: 0.85,
              }}
            >
              <RotatingText
                words={[
                  'Security Researcher',
                  'Bug Bounty Hunter',
                  'Full-Stack Developer',
                  'SaaS Builder',
                  'AI Security Specialist',
                ]}
                interval={2500}
                className="text-2xl sm:text-3xl md:text-4xl"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{
                duration: 0.8,
                delay: 3.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-base md:text-lg mb-10 max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Building Secure Systems. Shipping Intelligent Products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--text-inverse)',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'var(--accent-hover)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'var(--accent)')
                }
              >
                View Projects
                <ExternalLink size={14} />
              </a>
              <a
                href="/NADIPENA_VARUNKUMAR.pdf"
                download="NADIPENA_VARUNKUMAR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Right — Avatar & Role Tags */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center lg:items-end gap-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 3.0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Avatar */}
            <div className="avatar-ring" style={{ width: '140px', height: '140px' }}>
              <Image
                src="/profile.jpg"
                alt="Nadipena Varunkumar"
                width={140}
                height={140}
                className="rounded-full object-cover w-full h-full"
                priority
              />
            </div>

            {/* Role Tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
              {[
                'Security Researcher',
                'Full-Stack Dev',
                'Bug Bounty',
                'Cloud Infra',
                'AI/ML',
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="skill-pill glass-pill"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 3.2 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Marquee — below fold */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="relative z-10 pb-8"
      >
        <ScrollVelocity speed={25} direction="left" className="py-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium whitespace-nowrap px-6"
              style={{
                color: 'var(--text-tertiary)',
                opacity: 0.6,
              }}
            >
              {tech}
            </span>
          ))}
        </ScrollVelocity>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown
            size={20}
            style={{ color: 'var(--text-tertiary)' }}
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
