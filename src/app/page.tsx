'use client';

import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <motion.main
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Hero />
        <Experience />
        <Skills />
        <About />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </motion.main>
      <Footer />
    </>
  );
}
