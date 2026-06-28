import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Experience.css';

const EASE = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.05, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

export default function Experience() {
  const { lang } = useApp();
  const t = content[lang].experience;

  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <Reveal>
          <div className="sec-hdr">
            <span><span className="sec-hdr__num">02</span>&nbsp;&nbsp;—&nbsp;&nbsp;{lang === 'en' ? 'EXPERIENCE' : 'ESPERIENZA'}</span>
            <span className="sec-hdr__side">01 ENTRY</span>
          </div>
        </Reveal>

        <div className="exp__grid">
          {/* Left sidebar */}
          <Reveal className="exp__sidebar">
            <span className="exp__tag-badge">
              <span className="exp__tag-dot" />
              {t.tag}
            </span>
            <div className="exp__meta">
              <div className="exp__period">{t.period}</div>
              <div className="exp__company">{t.company}</div>
              <div className="exp__location">{t.location}</div>
            </div>
          </Reveal>

          {/* Right content */}
          <Reveal delay={0.1}>
            <h2 className="exp__role">{t.role}</h2>
            <p className="exp__intro">{t.intro}</p>

            <div className="exp__bullets">
              {[t.bl1, t.bl2, t.bl3].map((bl, i) => (
                <div className="exp__bullet" key={i}>
                  <span className="exp__bullet-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{bl}</p>
                </div>
              ))}
            </div>

            <div className="exp__techs">
              {t.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && <span className="exp__tech-sep">/</span>}
                  <span className="exp__tech">{tag}</span>
                </React.Fragment>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
