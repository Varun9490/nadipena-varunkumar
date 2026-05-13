'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Phone, ArrowUpRight, BookOpen } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import { RevealOnScroll } from './ui/RevealOnScroll';
import { BackgroundBeams } from './ui/BackgroundBeams';

function GithubIcon({ size = 20 }: { size?: number }) {
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

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Mail,
  Linkedin: LinkedinIcon,
  Github: GithubIcon,
  BookOpen,
  Phone,
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Contact"
    >
      {/* Background Beams */}
      <BackgroundBeams />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          className="max-w-2xl mx-auto text-center"
        >
          <RevealOnScroll direction="up">
            <p className="section-label justify-center">08 — Contact</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
              }}
            >
              Let&apos;s Build Something{' '}
              <span style={{ color: 'var(--accent)' }}>Secure.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p
              className="text-base md:text-lg mb-12"
              style={{ color: 'var(--text-secondary)' }}
            >
              Always open to interesting projects, collaborations, and security
              challenges. Reach out through any of these channels.
            </p>
          </RevealOnScroll>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={isInView ? { opacity: 1, clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{
            duration: 0.6,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {socialLinks.map((link, i) => {
            const Icon = iconMap[link.icon];
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target={
                  link.id === 'email' || link.id === 'phone'
                    ? undefined
                    : '_blank'
                }
                rel={
                  link.id === 'email' || link.id === 'phone'
                    ? undefined
                    : 'noopener noreferrer'
                }
                initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                animate={
                  isInView
                    ? { opacity: 1, clipPath: 'inset(0 0 0 0)' }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-card flex items-center gap-4 group"
                style={{ textDecoration: 'none' }}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {Icon && (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <Icon size={20} />
                  </motion.div>
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs uppercase tracking-wider font-semibold mb-0.5"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {link.label}
                  </p>
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {link.url
                      .replace('mailto:', '')
                      .replace('tel:', '')
                      .replace('https://', '')}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: 'var(--accent)' }}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
