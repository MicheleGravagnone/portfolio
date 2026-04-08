import React, { useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Hero.css';

const CODE = `@Controller('mcp')
export class MCPController {
  constructor(
    private readonly mcpService: MCPService
  ) {}

  @Post('request')
  async handleRequest(
    @Body() dto: MCPRequestDto
  ) {
    const result =
      await this.mcpService.process(dto);
    return { success: true, result };
  }
}`;

export default function Hero() {
  const { lang } = useApp();
  const t = content[lang].hero;
  const contentRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.95s cubic-bezier(0.4,0,0.2,1), transform 0.95s cubic-bezier(0.4,0,0.2,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });

    const onScroll = () => {
      if (!hintRef.current) return;
      const p = Math.min(window.scrollY / 380, 1);
      hintRef.current.style.setProperty('--sp', p);
      // hintRef.current.style.opacity = 1 - p;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__content" ref={contentRef}>
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          {t.badge}
        </div>

        <h1 className="hero__title">
          {t.title1}<br />
          <span className="gradient-text">{t.title2}</span><br />
          {t.title3}
        </h1>

        <p className="hero__subtitle">{t.subtitle}</p>

        <div className="hero__actions">
          <a href="#projects" className="hero__btn hero__btn--primary">
            {t.cta1}
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="https://github.com/michelegravagnone" target="_blank" rel="noreferrer" className="hero__btn hero__btn--secondary">
            <GitHubIcon /> GitHub
          </a>
          <a href="https://linkedin.com/in/michelegravagnone" target="_blank" rel="noreferrer" className="hero__btn hero__btn--secondary">
            <LinkedInIcon /> LinkedIn
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">{t.stat1Num}</span>
            <span className="hero__stat-label">{t.stat1Label}</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">{t.stat2Num}</span>
            <span className="hero__stat-label">{t.stat2Label}</span>
          </div>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__card glass-card">
          <div className="hero__card-header">
            <div className="hero__card-dots">
              <span style={{background:'#ff5f57'}}/>
              <span style={{background:'#ffbd2e'}}/>
              <span style={{background:'#28c840'}}/>
            </div>
            <span className="hero__card-filename">mcp.controller.ts</span>
          </div>
          <pre className="hero__code"><code>{CODE}</code></pre>
        </div>
        <div className="hero__badge-float hero__badge-float--1"><span>TypeScript</span></div>
        <div className="hero__badge-float hero__badge-float--2"><span>Docker</span></div>
        <div className="hero__badge-float hero__badge-float--3"><span>Microservices</span></div>
      </div>

      <div className="hero__scroll-hint" ref={hintRef} style={{'--sp': 0}}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}