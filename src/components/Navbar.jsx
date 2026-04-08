import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Navbar.css';

export default function Navbar() {
  const { theme, lang, toggleTheme, toggleLang } = useApp();
  const t = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-badge">MG</span>
          <span className="navbar__logo-name">Michele Gravagnone</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links">
          {t.links.map((label, i) => (
            <li key={t.hrefs[i]}>
              <a
                href={t.hrefs[i]}
                className={`navbar__link ${active === t.hrefs[i] ? 'navbar__link--active' : ''}`}
                onClick={() => setActive(t.hrefs[i])}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="navbar__controls">
          {/* Language toggle */}
          <button className="navbar__icon-btn" onClick={toggleLang} title="Switch language" aria-label="Switch language">
            <span className="navbar__lang-label">{lang === 'en' ? 'IT' : 'EN'}</span>
          </button>

          {/* Theme toggle */}
          <button className="navbar__icon-btn" onClick={toggleTheme} title="Switch theme" aria-label="Switch theme">
            {theme === 'dark' ? (
              /* Sun icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>

          {/* Hire me CTA */}
          <a href="mailto:michelegravagnone@gmail.com" className="navbar__cta">{t.cta}</a>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {t.links.map((label, i) => (
          <a
            key={t.hrefs[i]}
            href={t.hrefs[i]}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <div className="navbar__mobile-row">
          <button className="navbar__icon-btn" onClick={toggleLang}>
            <span className="navbar__lang-label">{lang === 'en' ? 'IT' : 'EN'}</span>
            <span style={{fontSize:12, marginLeft:4, color:'var(--text-tertiary)'}}>{lang === 'en' ? 'Italiano' : 'English'}</span>
          </button>
          <button className="navbar__icon-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
            <span style={{fontSize:12, marginLeft:4, color:'var(--text-tertiary)'}}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
        </div>
        <a href="mailto:michelegravagnone@gmail.com" className="navbar__mobile-cta">{t.cta}</a>
      </div>
    </nav>
  );
}