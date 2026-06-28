import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { AppProvider } from './AppContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import './index.css';

const MARQUEE_ITEMS = [
  'Java', 'PostgreSQL', 'Docker', 'Kubernetes',
  'REST APIs', 'Microservices', 'Distributed Systems', 'Node.js',
  'TypeScript', 'System Design', 'CI/CD',
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__sep">◇</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Portfolio() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      <div className="bg-ambient" aria-hidden="true">
        <div className="bg-ambient__glow" />
        <div className="bg-ambient__grid" />
        <div className="bg-ambient__noise" />
      </div>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Portfolio />
    </AppProvider>
  );
}
