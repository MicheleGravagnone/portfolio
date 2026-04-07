import React, { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-initials">MG</span>
          <span className="navbar__logo-name">Michele Gravagnone</span>
        </a>

        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`navbar__link ${active === l.href ? 'navbar__link--active' : ''}`}
                onClick={() => setActive(l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:michelegravagnone@gmail.com"
          className="navbar__cta"
        >
          Hire me
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a href="mailto:michelegravagnone@gmail.com" className="navbar__mobile-cta">
          Hire me
        </a>
      </div>
    </nav>
  );
}
