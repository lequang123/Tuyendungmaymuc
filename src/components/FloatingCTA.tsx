'use client';

import { useEffect, useState } from 'react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.floating} ${visible ? styles.visible : ''}`}>
      {/* Zalo */}
      <a
        href="https://zalo.me/0397915136"
        className={`${styles.btn} ${styles.zalo}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        id="floating-zalo"
      >
        <svg width="26" height="26" viewBox="0 0 48 48" fill="currentColor">
          <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm9.3 28.5c-1.5 1.5-3.5 2.2-6 2.2-2.2 0-4.5-.8-6.8-2.5-1 .3-2.5.8-4.3.8-1 0-2-.2-2.7-.7-.6-.5-.7-1.2-.3-1.8.5-.9 1.5-1.3 2.8-1.4-1.5-1.8-2.3-4-2.3-6.1 0-2.8 1-5.2 2.9-7 2-1.9 4.5-2.9 7.5-2.9s5.5 1 7.4 2.9c1.8 1.8 2.8 4.2 2.8 7-.1 3.6-1.5 6.6-3 8.3l.8.8c.3.3.4.7.2 1.2s-.7.8-1.3.8c-.4-.2-.7-.4-.7-.6z" />
        </svg>
        <span>Zalo</span>
      </a>

      {/* Phone */}
      <a
        href="tel:0397915136"
        className={`${styles.btn} ${styles.phone}`}
        aria-label="Gọi điện thoại"
        id="floating-phone"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
        </svg>
        <span>Gọi ngay</span>
      </a>

      {/* Register */}
      <a
        href="#lien-he"
        className={`${styles.btn} ${styles.register}`}
        aria-label="Đăng ký học"
        id="floating-register"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
        </svg>
        <span>Đăng ký</span>
      </a>
    </div>
  );
}
