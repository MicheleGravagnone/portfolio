import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './About.css';

const EASE = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.05, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const { lang } = useApp();
  const t = content[lang].about;

  const rows = [
    { num: '(01)', title: t.b1t, body: t.b1, accent: true },
    { num: '(02)', title: t.b2t, body: t.b2 },
    { num: '(03)', title: t.b3t, body: t.b3 },
  ];

  return (
    <section className="sec" id="about">
      <div className="wrap">
        <Reveal>
          <div className="sec-hdr">
            <span><span className="sec-hdr__num">01</span>&nbsp;&nbsp;—&nbsp;&nbsp;{lang === 'en' ? 'ABOUT' : 'CHI SONO'}</span>
            <span className="sec-hdr__side">PROFILE / MG</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="about__lead">{t.lead}</h2>
        </Reveal>

        <div className="about__rows">
          {rows.map((row, i) => (
            <Reveal key={row.num} delay={0.06 * (i + 1)}>
              <div className="about__row">
                <div className="about__row-label">
                  <span className={`about__row-num${row.accent ? ' about__row-num--accent' : ''}`}>{row.num}</span>
                  <span className="about__row-title">{row.title}</span>
                </div>
                <p className="about__row-body">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="about__foot">
            <div>
              <div className="about__foot-label">{t.edu_l}</div>
              <div className="about__foot-value">{t.edu_v}</div>
            </div>
            <div>
              <div className="about__foot-label">{t.lang_l}</div>
              <div className="about__foot-value">{t.lang_v}</div>
            </div>
            <div>
              <div className="about__foot-label">{t.avail_l}</div>
              <div className="about__foot-value">{t.avail_v}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
