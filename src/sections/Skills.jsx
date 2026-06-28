import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Skills.css';

const EASE = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

function AccordionRow({ group, open, onToggle, index }) {
  return (
    <Reveal delay={0.04 * index}>
      <div className={`acc${open ? ' acc--open' : ''}`}>
        <button className="acc__head" onClick={onToggle} aria-expanded={open}>
          <div className="acc__head-left">
            <span className="acc__code">{group.code}</span>
            <span className="acc__label">{group.label}</span>
          </div>
          <div className="acc__head-right">
            <span className="acc__count">{group.count}</span>
            <span className="acc__plus" aria-hidden="true" />
          </div>
        </button>
        <div className="acc__body" style={{ maxHeight: open ? '480px' : '0' }}>
          <div className="acc__body-inner">
            <div className="acc__items">
              {group.items.map((it, i) => (
                <React.Fragment key={it.name}>
                  {i > 0 && <span className="acc__sep">·</span>}
                  <span className={`acc__item${it.note ? ' acc__item--hi' : ''}`}>
                    {it.name}
                    {it.note && <span className="acc__note">{it.note}</span>}
                  </span>
                </React.Fragment>
              ))}
            </div>
            <p className="acc__foot-note">{group.note}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  const { lang } = useApp();
  const t = content[lang].skills;
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <Reveal>
          <div className="sec-hdr">
            <span><span className="sec-hdr__num">04</span>&nbsp;&nbsp;—&nbsp;&nbsp;{lang === 'en' ? 'CAPABILITIES' : 'COMPETENZE'}</span>
            <span className="sec-hdr__side">05 GROUPS</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="skills__intro">{t.intro}</p>
        </Reveal>

        <div className="acc__list">
          {t.groups.map((group, i) => (
            <AccordionRow
              key={group.code}
              group={group}
              open={openIndex === i}
              onToggle={() => toggle(i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
