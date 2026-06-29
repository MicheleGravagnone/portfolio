import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import { motion, useInView } from 'framer-motion';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Projects.css';
import McpDiagram from '../components/McpDiagram';

const EASE = [0.16, 1, 0.3, 1];

function useScrollDeactivate(ref) {
  useEffect(() => {
    const off = () => ref.current?.classList.remove('iframe-active');
    window.addEventListener('scroll', off, { passive: true });
    return () => window.removeEventListener('scroll', off);
  }, [ref]);
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Placeholder({ label, ratio }) {
  return (
    <div className="proj__img" style={{ aspectRatio: ratio }}>
      <div className="proj__img-cross proj__img-cross--tl" />
      <div className="proj__img-label">{label}</div>
      <div className="proj__img-dim">{ratio === '21/9' ? '21:9 · REPLACE WITH SCREENSHOT' : '4:3 · SCREENSHOT'}</div>
    </div>
  );
}

function OurDayDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '150px 0px' });

  return (
    <div
      ref={ref}
      className="proj__phone"
      onMouseEnter={() => window.dispatchEvent(new Event('dot-cursor'))}
      onMouseLeave={() => window.dispatchEvent(new Event('show-cursor'))}
    >
      {inView && (
        <iframe
          src="/portfolio/apps/our-day/"
          title="Our Day Demo"
          loading="lazy"
          allow="fullscreen"
          onMouseEnter={() => window.dispatchEvent(new Event('hide-cursor'))}
          onMouseLeave={() => window.dispatchEvent(new Event('dot-cursor'))}
        />
      )}
    </div>
  );
}

function PorscheDemo() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    margin: "150px 0px",
  });

  const images = [
    "/portfolio/apps/porsche/hero_dark.png",
    "/portfolio/apps/porsche/car-detail.png",
    "/portfolio/apps/porsche/shop.png",
    "/portfolio/apps/porsche/trio.png",
    "/portfolio/apps/porsche/dashboard.png",
    "/portfolio/apps/porsche/login.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [inView, images.length]);

  return (
    <div
      ref={ref}
      className="porsche-preview"
      onMouseEnter={() => window.dispatchEvent(new Event('dot-cursor'))}
      onMouseLeave={() => window.dispatchEvent(new Event('show-cursor'))}
    >
      {inView &&
        images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Porsche website preview"
            className={i === index ? "active" : ""}
          />
        ))}
    </div>
  );
}

function TaskTrackerDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '150px 0px' });
  useScrollDeactivate(ref);

  return (
    <div
      ref={ref}
      className="proj__terminal"
      onClick={() => {
        ref.current?.classList.add('iframe-active');
        window.dispatchEvent(new Event('hide-cursor'));
      }}
      onMouseEnter={() => window.dispatchEvent(new Event('dot-cursor'))}
      onMouseLeave={() => {
        ref.current?.classList.remove('iframe-active');
        window.dispatchEvent(new Event('show-cursor'));
      }}
    >
      {inView && (
        <iframe
          src="/portfolio/apps/task-tracker/"
          title="Task Tracker CLI Demo"
          loading="lazy"
          onMouseLeave={() => window.dispatchEvent(new Event('dot-cursor'))}
        />
      )}
    </div>
  );
}

function TorcsVizDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '150px 0px' });

  return (
    <div
      ref={ref}
      className="proj__torcs-viz"
      onMouseEnter={() => window.dispatchEvent(new Event('dot-cursor'))}
      onMouseLeave={() => window.dispatchEvent(new Event('show-cursor'))}
    >
      {inView && (
        <iframe
          src="/portfolio/apps/torcs-viz/"
          title="TORCS KNN Driver Visualization"
          loading="lazy"
        />
      )}
    </div>
  );
}

function ComplexCalcDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '150px 0px' });
  useScrollDeactivate(ref);

  return (
    <div
      ref={ref}
      className="proj__calc-frame"
      onClick={() => {
        ref.current?.classList.add('iframe-active');
        window.dispatchEvent(new Event('hide-cursor'));
      }}
      onMouseEnter={() => window.dispatchEvent(new Event('dot-cursor'))}
      onMouseLeave={() => {
        ref.current?.classList.remove('iframe-active');
        window.dispatchEvent(new Event('show-cursor'));
      }}
    >
      {inView && (
        <iframe
          src="/portfolio/apps/complex-calculator/"
          title="Complex Number Calculator Demo"
          loading="lazy"
          onMouseLeave={() => window.dispatchEvent(new Event('dot-cursor'))}
        />
      )}
    </div>
  );
}

function FeaturedProject({ p }) {
  const isMcpProject = p.title.toLowerCase().includes('mcp');

  return (
    <Reveal>
      <article className="proj proj--featured">
        {isMcpProject ? (
          <McpDiagram className="proj__img" />
        ) : (
          <Placeholder label={p.placeholder} ratio={p.ratio} />
        )}
        <div className="proj__featured-body">
          <div>
            <div className="proj__meta">
              <span className="proj__num proj__num--accent">{p.num}</span>
              <span className="proj__ctx">{p.ctx}</span>
            </div>
            <h3 className="proj__title proj__title--lg">{p.title}</h3>
          </div>
          <div>
            <p className="proj__desc">{p.desc}</p>
            <div className="proj__foot">
              <span className="proj__tags">{p.tags}</span>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ p, index }) {
  const reversed = p.reversed;

  return (
    <Reveal delay={0.04 * index}>
      <article className={`proj proj--card${reversed ? ' proj--card-rev' : ''}`}>
        {p.ourDay ? (
          <OurDayDemo />
        ) : p.porschePreview ? (
          <PorscheDemo />
        ) : p.complexCalc ? (
          <ComplexCalcDemo />
        ) : p.taskTracker ? (
          <TaskTrackerDemo />
        ) : p.torcsViz ? (
          <TorcsVizDemo />
        ) : (
          <Placeholder label={p.placeholder} ratio={p.ratio} />
        )}
        <div className="proj__card-body">
          <div className="proj__meta">
            <span className="proj__num">{p.num}</span>
            <span className="proj__ctx">{p.ctx}</span>
          </div>
          <h3 className="proj__title">{p.title}</h3>
          <p className="proj__desc">{p.desc}</p>
          <div className="proj__foot">
            <span className="proj__tags">{p.tags}</span>
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="proj__arrow"
                aria-label="GitHub"
              >
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const { lang } = useApp();
  const t = content[lang].projects;
  const [featured, ...rest] = t.items;

  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <Reveal>
          <div className="sec-hdr">
            <span><span className="sec-hdr__num">03</span>&nbsp;&nbsp;—&nbsp;&nbsp;{lang === 'en' ? 'SELECTED WORK' : 'LAVORO SELEZIONATO'}</span>
            <span className="sec-hdr__side">06 PROJECTS</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="proj__intro">{t.intro}</p>
        </Reveal>

        <div className="proj__list">
          <FeaturedProject p={featured} />
          {rest.map((p, i) => (
            <ProjectCard key={p.num} p={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
