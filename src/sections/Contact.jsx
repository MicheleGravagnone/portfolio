import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Contact.css';

const EASE = [0.16, 1, 0.3, 1];
const EMAIL = 'michelegravagnone@gmail.com';

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

function LineReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <span className="contact__clip" ref={ref}>
      <motion.span
        className="contact__clip-inner"
        initial={{ y: '105%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { lang } = useApp();
  const t = content[lang].contact;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="sec contact" id="contact">
      <div className="wrap">
        <Reveal>
          <div className="sec-hdr">
            <span><span className="sec-hdr__num">05</span>&nbsp;&nbsp;—&nbsp;&nbsp;{lang === 'en' ? 'CONTACT' : 'CONTATTI'}</span>
            <span className="sec-hdr__side">REACH OUT</span>
          </div>
        </Reveal>

        <div className="contact__headline" ref={ref}>
          <div className="contact__clip-wrap">
            <LineReveal delay={0.05}>{t.headline1}</LineReveal>
          </div>
          <div className="contact__clip-wrap">
            <LineReveal delay={0.19}>{t.headline2}</LineReveal>
          </div>
        </div>

        <Reveal delay={0.50} className="contact__actions">
          <a href={`mailto:${EMAIL}`} className="contact__btn contact__btn--fill">
            {t.ctaEmail}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button className="contact__btn contact__btn--ghost" onClick={copyEmail}>
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t.ctaCopied}
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                {t.ctaCopy}
              </>
            )}
          </button>
        </Reveal>

        <Reveal delay={0.64} className="contact__social">
          <a href="https://github.com/michelegravagnone" target="_blank" rel="noreferrer" className="contact__social-link">
            GitHub
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </a>
          <span className="contact__social-sep" aria-hidden="true">·</span>
          <a href="https://linkedin.com/in/michelegravagnone" target="_blank" rel="noreferrer" className="contact__social-link">
            LinkedIn
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </a>
        </Reveal>

        <motion.footer
          className="contact__footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
          ref={ref}
        >
          <span>{t.footer}</span>
          <span className="contact__footer-sep">·</span>
          <span>{new Date().getFullYear()}</span>
        </motion.footer>
      </div>
    </section>
  );
}
