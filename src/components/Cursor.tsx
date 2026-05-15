'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const DESKTOP_CURSOR_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1025px)';

function subscribeToDesktopPointer(callback: () => void) {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia(DESKTOP_CURSOR_QUERY);
  mediaQuery.addEventListener('change', callback);

  return () => {
    mediaQuery.removeEventListener('change', callback);
  };
}

function getDesktopPointerSnapshot() {
  return typeof window !== 'undefined' && window.matchMedia(DESKTOP_CURSOR_QUERY).matches;
}

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isDesktopPointer = useSyncExternalStore(
    subscribeToDesktopPointer,
    getDesktopPointerSnapshot,
    () => false
  );

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const handleMouseEnterInteractive = useCallback(() => setIsHovering(true), []);
  const handleMouseLeaveInteractive = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    if (!isDesktopPointer) {
      return;
    }

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    // Track interactive elements
    const selectors = 'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]';

    const addListeners = () => {
      const interactives = document.querySelectorAll(selectors);
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      return interactives;
    };

    let elements = addListeners();

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      elements = addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [
    isDesktopPointer,
    mouseX,
    mouseY,
    handleMouseEnterInteractive,
    handleMouseLeaveInteractive,
  ]);

  // Render nothing on mobile and tablet widths, but after all hooks.
  if (!isDesktopPointer) return null;

  return (
    <>
      {/* Dot — follows exactly */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
      />
      {/* Ring — spring-lagged */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.6 : 0,
          scale: isHovering ? 1.8 : 1,
          mixBlendMode: isHovering ? 'difference' : ('normal' as const),
          background: isHovering ? 'rgba(0, 180, 216, 0.08)' : 'transparent',
        }}
      />
    </>
  );
}
