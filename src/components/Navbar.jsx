import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './Navbar.css';

const SECTIONS = ['#about', '#experience', '#projects', '#skills', '#contact'];

export default function Navbar() {
  const { lang, toggleLang } = useApp();
  const t = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: '-100px 0px -40% 0px' }
    );
    SECTIONS.forEach((id) => { const el = document.querySelector(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [lang]);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 880) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />

      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="wrap navbar__inner">
          <a href="#hero" className="navbar__logo" onClick={close}>
            <span className="navbar__logo-sq" />
            <span className="navbar__logo-name">MICHELE GRAVAGNONE</span>
          </a>

          <ul className="navbar__links">
            {t.links.map((label, i) => (
              <li key={t.hrefs[i]}>
                <a
                  href={t.hrefs[i]}
                  className={`navbar__link${active === t.hrefs[i] ? ' navbar__link--active' : ''}`}
                  onClick={() => setActive(t.hrefs[i])}
                >
                  <span className="navbar__link-idx">{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__controls">
            <button className="navbar__lang" onClick={toggleLang} aria-label="Switch language">
              {lang === 'en' ? 'IT' : 'EN'}
            </button>
            <a href="#contact" className="navbar__cta btn-ghost" onClick={close}>
              {t.cta}
            </a>
            <button
              className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {t.links.map((label, i) => (
          <a
            key={t.hrefs[i]}
            href={t.hrefs[i]}
            className="navbar__mobile-link"
            onClick={close}
          >
            <span className="navbar__mobile-idx">{String(i + 1).padStart(2, '0')}</span>
            {label}
          </a>
        ))}
        <div className="navbar__mobile-foot">
          <button className="navbar__lang" onClick={toggleLang}>
            {lang === 'en' ? 'IT · Italiano' : 'EN · English'}
          </button>
        </div>
      </div>
    </>
  );
}
