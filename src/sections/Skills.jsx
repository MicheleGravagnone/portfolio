import React from 'react';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Skills.css';

export default function Skills() {
  const { lang } = useApp();
  const t = content[lang].skills;

  return (
    <section className="section" id="skills">
      <div className="fade-in">
        <p className="section-label">{t.label}</p>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.subtitle}</p>
      </div>

      <div className="skills__grid">
        {t.categories.map((cat, i) => (
          <div
            className={`skills__category glass-card fade-in fade-in-delay-${i % 3 + 1}`}
            key={cat.label}
          >
            <div className="skills__cat-header">
              <span className="skills__cat-label">{cat.label}</span>
            </div>
            <div className="skills__pills">
              {cat.skills.map((s) => (
                <span className="skills__pill" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
