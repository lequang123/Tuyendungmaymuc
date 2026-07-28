'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { href: '#khoa-hoc', label: 'Khóa học' },
  { href: '#hoc-phi', label: 'Học phí' },
  { href: '#quy-trinh', label: 'Quy trình' },
  { href: '#dia-diem', label: 'Địa điểm' },
  { href: '#lien-he', label: 'Liên hệ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="#f5a623" strokeWidth="2" />
              <circle cx="14" cy="14" r="5" fill="#f5a623" />
              <line x1="14" y1="2" x2="14" y2="9" stroke="#f5a623" strokeWidth="2" />
              <line x1="14" y1="19" x2="14" y2="26" stroke="#f5a623" strokeWidth="2" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>TT ĐÀO TẠO</span>
            <span className={styles.logoSub}>Cấp chứng chỉ</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#lien-he" className={`btn btn-primary ${styles.ctaBtn}`} id="header-cta">
          Đăng Ký Ngay
        </a>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          id="menu-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#lien-he" className={`btn btn-primary ${styles.mobileCta}`} onClick={() => setMenuOpen(false)}>
          Đăng Ký Ngay
        </a>
      </div>
    </header>
  );
}
