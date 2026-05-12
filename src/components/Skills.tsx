'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { InfiniteMarquee } from './ui/InfiniteMarquee';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { skillGroups } from '@/lib/data';

// Organize skills into 3 marquee rows
const marqueeRows = [
  {
    label: 'Languages & Web',
    skills: [
      'Python', 'Java', 'JavaScript', 'C', 'C++', 'SQL', 'Bash',
      'Node.js', 'Express.js', 'Django', 'Flask', 'React', 'Next.js', 'REST APIs',
    ],
    direction: 'left' as const,
    speed: 35,
  },
  {
    label: 'Security & AI',
    skills: [
      'Web App Security', 'API Security', 'Bug Bounty', 'OWASP Top 10',
      'XSS', 'SQLi', 'SSRF', 'IDOR', 'Auth Bypass',
      'LangChain', 'LangGraph', 'RAG Pipelines', 'Guardrails AI', 'Gemini API',
      'Prompt Engineering', 'Jailbreak Detection',
    ],
    direction: 'right' as const,
    speed: 30,
  },
  {
    label: 'Cloud, DB & Tools',
    skills: [
      'AWS', 'Azure', 'Docker', 'CI/CD', 'GitHub Actions', 'Linux',
      'PostgreSQL', 'MySQL', 'MongoDB',
      'Git', 'Burp Suite', 'Metasploit', 'Nmap', 'Wireshark',
      'JWT', 'OAuth 2.0', 'RBAC', 'MITRE ATT&CK',
    ],
    direction: 'left' as const,
    speed: 28,
  },
];

// Featured skill categories for spotlight cards
const featuredCategories = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Pentesting',
    description:
      'Offensive security testing — finding vulnerabilities before attackers do.',
    icon: '🔐',
    skills: ['Bug Bounty', 'OWASP', 'Burp Suite', 'VAPT'],
  },
  {
    id: 'ai-genai',
    title: 'AI & GenAI Security',
    description:
      'Building intelligent systems with LLM orchestration and AI safety guardrails.',
    icon: '🧠',
    skills: ['LangChain', 'RAG', 'Prompt Injection Defense', 'MITRE ATLAS'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description:
      'End-to-end application development with modern frameworks and cloud infrastructure.',
    icon: '⚡',
    skills: ['Next.js', 'Django', 'AWS', 'PostgreSQL'],
  },
];

function SkillPill({ skill }: { skill: string }) {
  return (
    <span
      className="skill-pill whitespace-nowrap"
      style={{ fontSize: '0.8rem', padding: '6px 16px' }}
    >
      {skill}
    </span>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 md:py-32" aria-label="Skills">
      <div className="section-container">
        <div ref={ref}>
          <RevealOnScroll direction="left">
            <span className="section-label">03 — Skills</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 max-w-2xl"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
              }}
            >
              Tools of the trade.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p
              className="text-base mb-16 max-w-lg"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Development expertise meets security mindset — from building to
              breaking.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Marquee Rows — full width, outside container */}
      <div className="space-y-6 mb-16">
        {marqueeRows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
          >
            <InfiniteMarquee
              direction={row.direction}
              speed={row.speed}
              pauseOnHover
            >
              {row.skills.map((skill) => (
                <SkillPill key={skill} skill={skill} />
              ))}
            </InfiniteMarquee>
          </motion.div>
        ))}
      </div>

      {/* Featured Skills Spotlight */}
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              animate={
                isInView
                  ? { opacity: 1, clipPath: 'inset(0 0 0 0)' }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card group"
              style={{ perspective: 800 }}
            >
              <motion.div
                whileHover={{
                  rotateX: -2,
                  rotateY: 3,
                  scale: 1.02,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {cat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-pill"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
