import React from 'react';
import './Skills.css';

const categories = [
  {
    label: 'Languages',
    icon: '{ }',
    skills: ['Python', 'Java', 'C', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    label: 'Development',
    icon: '⚡',
    skills: ['OOP', 'REST APIs', 'Microservices', 'Design Patterns', 'TDD', 'Agile'],
  },
  {
    label: 'Infrastructure',
    icon: '🐳',
    skills: ['Docker', 'Kubernetes', 'Linux', 'Git', 'Node.js', 'VS Code'],
  },
  {
    label: 'Concepts',
    icon: '🧠',
    skills: ['Distributed Systems', 'Networking', 'Databases', 'Operating Systems', 'MCP', 'API Orchestration'],
  },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="fade-in">
        <p className="section-label">Skills</p>
        <h2 className="section-title">My toolbox</h2>
        <p className="section-subtitle">
          Technologies and concepts I worked with — from low-level C to distributed cloud-native systems.
        </p>
      </div>

      <div className="skills__grid">
        {categories.map((cat, i) => (
          <div
            className={`skills__category glass-card fade-in fade-in-delay-${i % 3 + 1}`}
            key={cat.label}
          >
            <div className="skills__cat-header">
              <span className="skills__cat-icon">{cat.icon}</span>
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
