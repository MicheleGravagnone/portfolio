import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Projects.css';

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  const { lang } = useApp();
  const t = content[lang].projects;

  return (
    <section className="section" id="projects">
      <div className="fade-in">
        <p className="section-label">{t.label}</p>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.subtitle}</p>
      </div>

      <div className="projects__grid">
        {t.items.map((p, i) => (
          <div
            key={i}
            className={`projects__card glass-card fade-in fade-in-delay-${(i % 3) + 1} ${p.featured ? 'projects__card--featured' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ '--card-accent': p.accent }}
          >
            {p.featured && (
              <div className="projects__featured-badge">Featured</div>
            )}
            <div className="projects__icon">{p.icon}</div>
            <h3 className="projects__title">{p.title}</h3>
            <p className="projects__desc">{p.description}</p>
            <p className="projects__context">{p.context}</p>
            <div className="projects__tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
