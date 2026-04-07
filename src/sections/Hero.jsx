import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const hintRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });

    const handleScroll = () => {
      if (!hintRef.current) return;
      const currentScroll = window.scrollY;

      const progress = Math.min(currentScroll / 400, 1);

      hintRef.current.style.setProperty('--scroll-progress', progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__content" ref={textRef}>
        <div className="hero__badge fade-in">
          <span className="hero__badge-dot" />
          Available for opportunities
        </div>

        <h1 className="hero__title">
          Building<br />
          <span className="gradient-text">reliable software</span><br />
          that scales.
        </h1>

        <p className="hero__subtitle">
          Software Engineer based in Naples, Italy. Computer Engineering graduate
          with a focus on backend systems and distributed architectures / cloud solutions.
        </p>

        <div className="hero__actions">
          <a href="#projects" className="hero__btn hero__btn--primary">
            View projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="https://github.com/michelegravagnone"
            target="_blank"
            rel="noreferrer"
            className="hero__btn hero__btn--secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/michelegravagnone"
            target="_blank"
            rel="noreferrer"
            className="hero__btn hero__btn--secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">C2</span>
            <span className="hero__stat-label">English level</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">BSc</span>
            <span className="hero__stat-label">Computer Engineering</span>
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
            <span className="hero__card-filename">server.ts</span>
          </div>
          <pre className="hero__code"><code>
{`@Controller('mcp')
export class MCPController {
  constructor(private readonly mcpService: MCPService) {}

  @Post('request')
  async processRequest(@Body() request: MCPRequestDto) {
    try {
      const response = await this.mcpService.processRequest(request);
      return response;
    } catch (error: any) {
      throw new HttpException(
        {
          success: false,
          error: {
            code: 'MCP_REQUEST_ERROR',
            message: error.message,
          },      
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
`}
          </code></pre>
        </div>

        <div className="hero__floating-badge hero__floating-badge--1">
          <span>TypeScript</span>
        </div>
        <div className="hero__floating-badge hero__floating-badge--2">
          <span>Cloud</span>
        </div>
        <div className="hero__floating-badge hero__floating-badge--3">
          <span>Microservices</span>
        </div>
      </div>

      <div 
        className="hero__scroll-hint"
        ref={hintRef}
        style={{ '--scroll-progress': 0 }} // Initial state
      >
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
