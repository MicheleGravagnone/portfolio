import React from 'react';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Experience.css';

export default function Experience() {
  const { lang } = useApp();
  const t = content[lang].experience;

  return (
    <section className="section" id="experience">
      <div className="fade-in">
        <p className="section-label">{t.label}</p>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.subtitle}</p>
      </div>

      <div className="exp__list">
        {t.items.map((exp, i) => (
          <div className="exp__item glass-card fade-in fade-in-delay-2" key={i}>
            <div className="exp__left">
              <div className="exp__meta">
                <span className="exp__company">{exp.company}</span>
                <span className="exp__location">{exp.location}</span>
              </div>
            </div>
            <div className="exp__right">
              <h3 className="exp__role">{exp.role}</h3>
              <span className="exp__period">{exp.period}</span>
              <ul className="exp__bullets">
                {exp.bullets.map((b, j) => (
                  <li key={j}>
                    <span className="exp__dot" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="exp__tags">
                {exp.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}