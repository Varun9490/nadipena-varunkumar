'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastScrollY.current;
    setScrolled(latest > 20);

    if (latest > 80) {
      setHidden(delta > 5);
    } else {
      setHidden(false);
    }

    lastScrollY.current = latest;
  });

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: hidden ? -80 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="transition-all duration-300"
          style={{
            background: scrolled ? 'var(--bg-nav)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          }}
        >
          <div className="section-container flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" aria-label="Home" className="relative z-50">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  width="32"
                  height="32"
                  rx="6"
                  fill="var(--accent)"
                  fillOpacity="0.1"
                />
                <path
                  d="M7 8L12 24L16 14L20 24L25 8"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 16L19 16"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.href.replace('#', '') ? 'active' : ''
                  }`}
                  style={{
                    color:
                      activeSection === link.href.replace('#', '')
                        ? 'var(--text-primary)'
                        : 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--text-primary)')
                  }
                  onMouseLeave={(e) => {
                    if (activeSection !== link.href.replace('#', '')) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}

              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg transition-colors duration-200"
                  style={{
                    color: 'var(--text-secondary)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2 relative z-50">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg"
                style={{ color: 'var(--text-primary)' }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-overlay"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-medium"
                  style={{
                    color:
                      activeSection === link.href.replace('#', '')
                        ? 'var(--accent)'
                        : 'var(--text-primary)',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
