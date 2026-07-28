'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

type Particle = {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  width: string;
  height: string;
};

const stats = [
  { value: 28, suffix: '+', label: 'Khóa nghề đào tạo' },
  { value: 5000, suffix: '+', label: 'Học viên đã tốt nghiệp' },
  { value: 10, suffix: '+', label: 'Năm kinh nghiệm' },
  { value: 95, suffix: '%', label: 'Có việc làm sau đào tạo' },
];

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1800, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.statValue}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${4 + Math.random() * 4}s`,
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
    }));
    setParticles(generated);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Animated background particles */}
      <div className={styles.bg}>
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
        <div className={styles.bgGrid} />
        <div className={styles.particles}>
          {particles.map((p, i) => (
            <div key={i} className={styles.particle} style={{
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
              width: p.width,
              height: p.height,
            }} />
          ))}
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          🎓 Tuyển Sinh 2026 – Khu vực Thanh Hóa
        </div>

        {/* Headline */}
        <h1 className={styles.headline}>
          Cấp Chứng Chỉ <br />
          <span className={styles.headlineAccent}>Xe Nâng • Máy Múc • Xe Lu</span>
          <br />
          Tại <span className={styles.headlineLocation}>Thanh Hóa & Toàn Quốc</span>
        </h1>

        {/* Sub */}
        <p className={styles.subtitle}>
          Trung Tâm Đào Tạo thực chiến ngắn hạn Xe Nâng, Máy Xúc (Máy Múc), Xe Lu, Công Nghệ Hàn.
          Hỗ trợ thi và cấp nhanh chứng chỉ nghề hợp pháp tại Thanh Hóa và các tỉnh trên cả nước!
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctas}>
          <a href="#lien-he" className="btn btn-accent btn-lg" id="hero-cta-register">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            Đăng Ký Tư Vấn Ngay
          </a>
          <a href="#hoc-phi" className="btn btn-outline-white btn-lg" id="hero-cta-courses">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 8 16 12 12 16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Xem Học Phí
          </a>
        </div>

        {/* Trust badges */}
        <div className={styles.trust}>
          <div className={styles.trustItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L3 7v10l9 5 9-5V7z" /></svg>
            Chứng chỉ toàn quốc
          </div>
          <div className={styles.trustItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
            Học thực chiến
          </div>
          <div className={styles.trustItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            Hỗ trợ việc làm sau khóa học
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Cuộn để xem thêm</span>
      </div>
    </section>
  );
}
