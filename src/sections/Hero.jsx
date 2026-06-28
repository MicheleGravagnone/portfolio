import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Hero.css';

const EASE = [0.16, 1, 0.3, 1];

function LineReveal({ children, delay = 0 }) {
  return (
    <span className="hero__clip">
      <motion.span
        className="hero__clip-inner"
        initial={{ y: '118%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.15, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.05, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} CET`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const { lang } = useApp();
  const t = content[lang].hero;
  const time = useClock();

  return (
    <section className="hero" id="hero">
      <div className="wrap hero__wrap">
        {/* Title */}
        <h1 className="hero__title">
          <LineReveal delay={0.1}>{t.t1}</LineReveal>
          <LineReveal delay={0.2}>{t.t2}</LineReveal>
          <LineReveal delay={0.3}>{t.t3}</LineReveal>
        </h1>

        {/* CTA row */}
        <FadeUp delay={0.48} className="hero__row">
          <a href="#projects" className="hero__viewwork">
            <span>{t.viewwork}</span>
            <span className="hero__viewwork-arrow">→</span>
          </a>
        </FadeUp>
      </div>

      {/* Footer stats */}
      <div className="hero__foot-wrap">
        <div className="wrap">
          <div className="hero__foot-rule" />
          <div className="hero__foot-grid">
            <FadeUp delay={0.62}>
              <div className="hero__stat-label">{t.loc_l}</div>
              <div className="hero__stat-value">{t.loc_v}</div>
            </FadeUp>
            <FadeUp delay={0.68}>
              <div className="hero__stat-label">{t.focus_l}</div>
              <div className="hero__stat-value">{t.focus_v}</div>
            </FadeUp>
            <FadeUp delay={0.74}>
              <div className="hero__stat-label">{t.status_l}</div>
              <div className="hero__stat-value">
                <span className="hero__status-dot">●</span> {t.status_v}
              </div>
            </FadeUp>
            <FadeUp delay={0.80}>
              <div className="hero__stat-label">{t.time_l}</div>
              <div className="hero__stat-value hero__clock">{time}</div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
