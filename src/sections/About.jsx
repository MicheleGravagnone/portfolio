import React from 'react';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './About.css';

export default function About() {
  const { lang } = useApp();
  const t = content[lang].about;

  return (
    <section className="section" id="about">
      <div className="about__grid">
        <div className="about__text fade-in">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title" style={{whiteSpace:'pre-line'}}>{t.title}</h2>
          <p className="about__body">{t.p1}</p>
          <p className="about__body">{t.p2}</p>
          <p className="about__body">{t.p3}</p>
          <div className="about__links">
            <a href="mailto:michelegravagnone@gmail.com" className="about__link">
              <MailIcon /> michelegravagnone@gmail.com
            </a>
            <span className="about__link about__link--static">
              <PinIcon /> {t.location}
            </span>
          </div>
        </div>

        <div className="about__cards fade-in fade-in-delay-2">
          {t.cards.map((c) => (
            <div className="about__card glass-card" key={c.title}>
              <div className="about__card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}