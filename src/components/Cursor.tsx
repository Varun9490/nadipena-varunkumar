'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const handleMouseEnterInteractive = useCallback(() => setIsHovering(true), []);
  const handleMouseLeaveInteractive = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    // Detect touch devices
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

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
  }, [mouseX, mouseY, handleMouseEnterInteractive, handleMouseLeaveInteractive]);

  // Render nothing on touch devices, but AFTER all hooks
  if (isTouchDevice) return null;

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
