import React, { useState } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'MCP-Based API Orchestration Server',
    description:
      'Backend server built on the Model Context Protocol to orchestrate API interactions within a microservices architecture. Enables controlled access to internal services through tool definition, with automatic communication between distributed components.',
    tags: ['TypeScript', 'Node.js', 'Docker', 'Kubernetes', 'REST APIs'],
    context: 'BS Thesis · University of Salerno × Lanificio Digitale',
    featured: true,
    icon: '⚙️',
    accent: '#4f8eff',
  },
  {
    title: 'Complex Numbers Calculator',
    description:
      'Java desktop application with GUI for operations on complex numbers. Built with a stack-based data structure following OOP principles. Covers the full software lifecycle: planning, requirements, design, implementation and testing.',
    tags: ['Java', 'SceneBuilder', 'Figma', 'OOP', 'Unit Testing'],
    context: 'Software Engineering course',
    icon: '🧮',
    accent: '#a855f7',
  },
  {
    title: 'Autonomous Driving Agent — TORCS',
    description:
      'Autonomous driving agent for the TORCS simulator using a K-Nearest Neighbors machine learning model. Covered dataset preparation, model training and evaluation in a simulated environment for autonomous steering and speed control.',
    tags: ['Java', 'Machine Learning', 'KNN', 'TORCS'],
    context: 'Machine Learning course',
    icon: '🚗',
    accent: '#4f8eff',
  },
  {
    title: 'Car Dealership Web Store',
    description:
      'Full-stack web application for a car dealership. Features product catalog, user authentication and personal dashboard. Backend in PHP + PostgreSQL, frontend in HTML/CSS/JavaScript.',
    tags: ['PHP', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS'],
    context: 'Web Technologies course',
    icon: '🛒',
    accent: '#a855f7',
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="section" id="projects">
      <div className="fade-in">
        <p className="section-label">Projects</p>
        <h2 className="section-title">Things I've built</h2>
        <p className="section-subtitle">
          A selection of academic and personal projects spanning backend engineering,
          machine learning and full-stack development.
        </p>
      </div>

      <div className="projects__grid">
        {projects.map((p, i) => (
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
