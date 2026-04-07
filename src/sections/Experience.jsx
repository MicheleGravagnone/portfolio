import React from 'react';
import './Experience.css';

const experiences = [
  {
    company: 'Lanificio Digitale S.r.l.',
    location: 'Naples, Italy',
    role: 'Backend Engineer — Bachelor\'s Thesis',
    period: 'Nov 2025 – Feb 2026',
    bullets: [
      'Designed and implemented an MCP-based backend server for controlled API orchestration within microservices architectures.',
      'Developed mechanisms to manage interactions between internal services and external APIs, with a strong focus on automation and reliability.',
      'Worked closely with production infrastructure using Docker and Node.js on a TypeScript codebase.',
    ],
    tags: ['TypeScript', 'Node.js', 'Docker', 'REST APIs', 'Kubernetes', 'MCP'],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="fade-in">
        <p className="section-label">Experience</p>
        <h2 className="section-title">Where I've worked</h2>
        <p className="section-subtitle">
          Hands-on experience building real backend infrastructure in a production environment.
        </p>
      </div>

      <div className="experience__list">
        {experiences.map((exp, i) => (
          <div className="experience__item glass-card fade-in fade-in-delay-2" key={i}>
            <div className="experience__left">
              <div className="experience__company-badge">
                {exp.company.charAt(0)}
              </div>
              <div className="experience__meta">
                <span className="experience__company">{exp.company}</span>
                <span className="experience__location">{exp.location}</span>
              </div>
            </div>

            <div className="experience__right">
              <div className="experience__header">
                <div>
                  <h3 className="experience__role">{exp.role}</h3>
                  <span className="experience__period">{exp.period}</span>
                </div>
              </div>

              <ul className="experience__bullets">
                {exp.bullets.map((b, j) => (
                  <li key={j}>
                    <span className="experience__bullet-dot" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="experience__tags">
                {exp.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
