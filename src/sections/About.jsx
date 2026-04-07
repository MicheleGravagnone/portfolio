import React from 'react';
import './About.css';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="about__grid">
        <div className="about__text fade-in">
          <p className="section-label">About me</p>
          <h2 className="section-title">
            Engineer by training,<br />builder by nature.
          </h2>
          <p className="about__body">
            I'm Michele, a Computer Engineering graduate from the University of Salerno.
            My academic journey has been centered around backend systems, microservices
            architectures, and the design of reliable, scalable software.
          </p>
          <p className="about__body">
            My thesis project at Lanificio Digitale brought me deep into the Model Context
            Protocol — designing an orchestration server that manages interactions between
            internal services and external APIs with precision and control.
          </p>
          <p className="about__body">
            Beyond code, I'm fluent in English (Cambridge C2), love classical studies from
            my Liceo background, and am always looking to grow — whether that means picking
            up a new technology or relocating for the right opportunity.
          </p>
          <div className="about__links">
            <a href="mailto:michelegravagnone@gmail.com" className="about__link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              michelegravagnone@gmail.com
            </a>
            <a href="tel:+393312007540" className="about__link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +39 331 200 7540
            </a>
            <span className="about__link about__link--location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Naples, Italy · Open to relocation
            </span>
          </div>
        </div>

        <div className="about__cards fade-in fade-in-delay-2">
          <div className="about__card glass-card">
            <div className="about__card-icon">🎓</div>
            <h3>Education</h3>
            <p>BSc Computer Engineering, University of Salerno (2021–2026)</p>
            <span className="tag">Summa Cum Laude — Liceo Classico</span>
          </div>
          <div className="about__card glass-card">
            <div className="about__card-icon">🌍</div>
            <h3>Languages</h3>
            <p>Italian (native) · English C2 certified by Cambridge University Press</p>
          </div>
          <div className="about__card glass-card">
            <div className="about__card-icon">✈️</div>
            <h3>Available for relocation</h3>
            <p>Open to on-site, hybrid, and remote opportunities worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
